import {sendMessage} from 'socketHandler';
export const viewChat = (tree, chat) => {
  
  tree.set(['chat', 'viewing'], chat);
  if(chat === 'general' || chat === 'game') {
    return tree.set(['chat', 'chats', chat, 'new'], 0);
  }
  const privates = tree.get(['chat', 'chats', 'privates']);
  const index = getIndexOfPrivate(privates, chat);
  return tree.set(['chat', 'chats', 'privates', index, 'new'], 0);
};

export const closeChat = (tree, chat) => {
  
  const viewing = tree.get(['chat', 'viewing']);
  const privatesCursor = tree.select(['chat', 'chats', 'privates']);
  let privates = privatesCursor.get();
  
  const index = getIndexOfPrivate(privates, chat);
 
  if(viewing === chat)
    tree.set(['chat', 'viewing'], 'general');
  
  privatesCursor.unset(index);
};

export const sendMsg = (tree, message, to) => {
  
  console.log(message);
  
  let type;
  if(to === 'game') {
    type = 'game';
    to = tree.get('game', 'id');
  } else if(to === 'general') {
    type = 'room';
  } else {
    type = 'private';
  }
  
  sendMessage(to, type, message);
  
};

export const getGeneralChat = (tree) => {
  
  const generalChat = tree.select('chat', 'chats', 'general');
  
  fetch(`/api/messages/rooms/general`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(json => {
        generalChat.set('messages', json);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
  
};

export const getGameChat = (tree, id) => {
  
  const gameChat = tree.select('chat', 'chats', 'game');
  
  fetch(`/api/messages/games/${id}`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(json => {
        gameChat.set('messages', json);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
  
};

export const getPrivateChat = (tree, user) => {
  
  const privChats = tree.select('chat', 'chats', 'privates');
  
  return fetch(`/api/messages/users/${user}`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(json => {
        const index = getIndexOfPrivate(privChats.get(), user);
        if(index < 0) {
          privChats.push({
            name: user,
            new: 0,
            messages: response
          });
        } else {
          privChats.set(index, {
            name: user,
            new: 0,
            messages: response
          });
        }
        gameChat.set('messages', json);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
  
};

export const getIndexOfPrivate = (privates, chat) => {

  for(var i = 0; i < privates.length; i++) {
    if(privates[i].name === chat)
      return i;
  }
  return -1;
};





import { browserHistory } from 'react-router';
import {getPrivateChat, getIndexOfPrivate} from 'containers/Chatmenu/actions';

export const acceptFriend = (tree, username) => {
  
  const requests = tree.select(['user', 'friendRequests']);
  console.log(requests.get());
  
  fetch(`/api/friends`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify({
      username: username
    })
  })
  .then((response) => {
    if(response.ok) {
      const position = requests.get().indexOf(username);
      requests.splice([position, 1]);
    }
  })
  .catch((err) => {
    console.log(err);
  });

};

export const declineFriend = (tree, username) => {
  
  const requests = tree.select(['user', 'friendRequests']);
  
  fetch(`/api/friends/requests/${username}`, {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      const position = requests.get().indexOf(username);
      console.log(position);
      requests.splice([position, 1]);
    }
  })
  .catch((err) => {
    console.log(err);
  });

};

export const getFriendRequests = (tree) => {
  
  const friendRequests = tree.select(['user', 'friendRequests']);
  
  fetch(`/api/friends/requests`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(json => {
        friendRequests.set(json);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const getFriends = (tree) => {
  
  const friends = tree.select(['user', 'friends']);
  
  fetch(`/api/friends/`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(json => {
        friends.set(json.map(val => {
          return {name: val, online: true};
        }));
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const sendFriendRequest = (tree, username) => {
  
  const view = tree.select('sidemenu');
  
  fetch(`/api/friends/requests`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify({
      username: username
    })
  })
  .then((response) => {
    if(response.ok) {
      console.log(response.text());
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const createGame = () => {
  
  fetch(`/api/games/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin'
  })
  .then(response => {
    if(response.ok) {
      response.json()
      .then(response => {
        console.log(response);
        browserHistory.push(`/game/${response.gameID}`);
      });
    }
  });
};

export const openChat = (tree, user) => {
  
  const chat = tree.select('chat');
  const privates = chat.get('chats', 'privates');
  
  if(getIndexOfPrivate(privates, user) < 0) {
    getPrivateChat(tree, user)
    .then(() => {
      chat.set('viewing', user);
    })
  } else {
    chat.set('viewing', user);
  }
  
}




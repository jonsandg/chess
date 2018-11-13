import {connect} from 'socketHandler';

export const setView = (tree, view) => {
  console.log('Setting view:', view);
  tree.set('sidemenu', view);
};

export const submitSignIn = (tree, username, password, type) => {
  
  const view = tree.select('sidemenu');
  const currentView = view.get();
  
  view.set('loading');
  
  fetch(`/account/${type}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  .then((response) => {
    if(response.ok) {
      view.set('loggedin');
      onSuccessSignIn(tree, response);
    } else {
      view.set(currentView);
    }
  })
  .catch((err) => {
    console.log(err);
  });

  
};

export const signout = (tree) => {
  const view = tree.select('sidemenu');

  fetch(`/account/signout`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      view.set('signin');
      tree.set(['user', 'name'], null);
      tree.set(['user', 'friends'], []);
      tree.set(['user', 'friendRequests'], []);
      connect();
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const trySignIn = (tree) => {
  
  const view = tree.select('sidemenu');
  view.set('loading');
  
  return fetch(`/account/signin`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      view.set('loggedin');
      onSuccessSignIn(tree, response);
    } else {
      view.set('signin');
      connect();
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

const onSuccessSignIn = (tree, response) => {
  response.json()
  .then((response) => {
    console.log(response);
    tree.set(['user', 'name'], response.username);
    connect();
  })
  .catch((err) => {
    console.log(err);
  });
};


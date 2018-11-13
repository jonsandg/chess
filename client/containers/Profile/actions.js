import { browserHistory } from 'react-router';

export const getUser = (tree, username) => {
  
  fetch(`/api/users/${username}`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(response => {
        console.log(response);
        tree.set('profile', response);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};

export const createGame = (tree, username) => {
  
  fetch(`/api/games/`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'same-origin',
    body: JSON.stringify({
      username: username
    })
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
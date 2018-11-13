export const getGames = (tree) => {
  
  fetch(`/api/games`, {
    credentials: 'same-origin'
  })
  .then((response) => {
    if(response.ok) {
      response.json()
      .then(response => {
        tree.set('activeGames', response);
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
};
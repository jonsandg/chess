# Multiplayer Chess Web App

Project for [DD1389 Internet Programming](https://www.kth.se/student/kurser/kurs/DD1389?l=en) at KTH

[Live Demo Link](https://calm-meadow-13925.herokuapp.com/)

### Features:
* Multiplayer chess
* Ability to observe ongoing games
* Lists of ongoing games and games waiting for an opponent
* Basic account system
* Basic friend system
* Chat system with global and game specific channels, as well as private channels between friends

### Technologies/frameworks/languages
* The client is a single page web app written in React
* Backend is running on node.js, written with the help of express, mongoose, socket.io and passport
* Client-server communication is REST over HTTP with some websocket communication mixed in to enable real time updates
* Database is MongoDB

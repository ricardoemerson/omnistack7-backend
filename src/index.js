const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

// Splits the server to accept http connections and web sockets.
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Creates the database conection.
mongoose.connect('mongodb+srv://admin:as1mn1@cluster0-d6osd.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
});

// Create own middleware to include io to all application routes in the project.
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Enable cors for all domains.
app.use(cors());

// Create a route to access statics files (uploads images) through /files.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

// Include users routes.
app.use(require('./routes'));

server.listen(3333);

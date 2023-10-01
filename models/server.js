//Servidor Express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Socket = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = http.createServer(this.app);

    //configuraciones de sockets
    this.io = socketio(this.server, {
      /*configuraciones*/
    });
  }
  middlewares() {
    //desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets() {
    new Socket(this.io);
  }
  execute() {
    //inicialezar middlewares
    this.middlewares();
    //inicializar sockets
    this.configurarSockets();
    //inicializar server
    this.server.listen(this.port, () => {
      console.log("Server on: http://localhost:", this.port);
    });
  }
}

module.exports = Server;

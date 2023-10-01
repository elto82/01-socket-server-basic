class Socket {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }
  socketEvents() {
    //on connection
    this.io.on("connection", (socket) => {
      //escuchar evento
      socket.on("message-to-server", (data) => {
        console.log(data);

        this.io.emit("message-from-server", data);
      });
    });
  }
}

module.exports = Socket;

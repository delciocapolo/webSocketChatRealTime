import { io } from "./http";

// assim que o cliente se conectar na aplicacao
io.on("connection", (socket) => {
    console.log(socket.id)
});
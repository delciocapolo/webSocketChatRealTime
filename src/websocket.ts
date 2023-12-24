import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

const users: Array<RoomUser> = []

// assim que o cliente se conectar na aplicacao
// when the client connect to the app
io.on("connection", (socket) => {
    socket.on("select_room", ({username, room}) => {
        // console.log(username, room)

        users.push({
            username, 
            room,
            socket_id: socket.id
        })

        console.log(users)
    })
});

// usaremos o io => quando for para nossa aplicacao emitir um ação ou mensagem para aplicação toda
// e socket(parametro) => quando for mais direcionado para o cliente e não a app todo
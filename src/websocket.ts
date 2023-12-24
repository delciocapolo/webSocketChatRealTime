import { io } from "./http";

interface RoomUser {
    socket_id: string;
    username: string;
    room: string;
}

interface Message {
    room: string;
    text: string; // content
    createdAt: Date;
    username: string;
}

const users: Array<RoomUser> = []
const messages: Message[] = [];

// assim que o cliente se conectar na aplicacao
// when the client connect to the app
io.on("connection", (socket) => {
    socket.on("select_room", ({username, room}, callback) => {
        // com o join, o usuario sera enviado para sala que ele escolheu
        // todos os registos(mensagens e outros), serão vistos apenas por esses usuários
        socket.join(room)
        
        const userInRoom = users.find(
            (user) => user.username === username && user.room === room
        );

        if(userInRoom) {
            userInRoom.socket_id = socket.id;
            return;
        }
        
        users.push({
            username, 
            room,
            socket_id: socket.id
        });

        // usando o parametro 'callback' para repassar as mensagens
        const messagesInRoom = getMessagesRoom(room);
        callback(messagesInRoom);
    });

    socket.on("message", ({room, username, message}) => {
        // saving messages
        const messageSent: Message = {
            room,
            username,
            text: message,
            createdAt: new Date()
        }
        messages.push(messageSent);
        
        // send to users in room
        io.to(room).emit("message", messageSent);
    });
});

// usaremos o io => quando for para nossa aplicacao emitir um ação ou mensagem para aplicação toda
// e socket(parametro) => quando for mais direcionado para o cliente e não a app todo

function getMessagesRoom(room: string) {
    const messagesInRoom = messages.filter((message) => message.room === room)
    return messagesInRoom;
}
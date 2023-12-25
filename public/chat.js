const socket = io()

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")

socket.emit("select_room", {
        username,
        room
    }, 
    (messages) => {
        // when the user enters the room, all messages are loaded
        messages.forEach(message => createMessage(message))
    }
);

const usernameDiv = document.getElementById("username");
usernameDiv.innerText = `Hey, ${username} - you are in ${room} room`;

document
    .getElementById("message_input")
    .addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            const message = event.target.value;
            
            const data = {
                room,
                message,
                username
            };
            socket.emit("message", data);

            event.target.value = "";
        }
    });
    
socket.on("message", (data) => {
    // when a message is sent, it appears in chat immediately
    createMessage(data)
});

// we'll use emit - to emit an information
// and on - to listen or receive an information
// att: we can use in serverside or clientside
// in this case:
//  we'll use the '.js' like client
// and the '.ts' extension for us serverside

function createMessage(data) {
    const messageDiv = document.getElementById("messages");
    messageDiv.innerHTML += `
    <div class="new_message">
        <label for="" class="form-label">
            <strong>${data.username}</strong>
            <span>${data.text} - ${dayjs(data.createdAt).format("DD/MM HH:mm")}</span>
        </label>
    </div>
    `;
}

document.getElementById("logout").addEventListener("click", (event) =>{
  const baseURL = window.location.href;
  window.location.href = baseURL.slice(0, baseURL.lastIndexOf("/"));
});

const socket = io()

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")

socket.emit("select_room", {
        username,
        room
    }, response => {
        console.log(response)
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
    
socket.on("message", ({username, text, createdAt, room}) => {
    const messageDiv = document.getElementById("messages");
    messageDiv.innerHTML += `
    <div id="chat_content">
        <div class="messages" id="message">
            <div class="new_message">
                <label for="" class="form-label">
                    <strong>${username}</strong>
                    <span>${text} - ${dayjs(createdAt).format("DD/MM HH:mm")}</span>
                </label>
            </div>
        </div>
    </div>
    `
});

// we'll use emit - to emit an information
// and on - to listen or receive an information
// att: we can use in serverside or clientside
// in this case:
//  we'll use the '.js' like client
// and the '.ts' extension for us serverside
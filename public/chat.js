const socket = io()

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get("username")
const room = urlSearch.get("select_room")

socket.emit("select_room", {
    username,
    room
})

console.log(username, room)


// we'll use emit - to emit an information
// and on - to listen or receive an information
// att: we can use in serverside or clientside
// in this case:
//  we'll use the '.js' like client
// and the '.ts' extension for us serverside
////

const socket = io();

socket.on("message", (message) => {
    console.log(message);
    //socket.emit("message", "Hello from client");
    appendMessage(message);
}
);



//DOM manipulation
const messagesContainer = document.getElementById("chat-messages");

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messagesContainer.append(messageElement);
}

/// bind DOM elements
const sendbutton = document.getElementById("send-message");
const inputMessage = document.getElementById("input-message");

sendbutton.addEventListener("click", () => {
    sendMessage();
}
);

inputMessage.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
}
);


function sendMessage() {
    const message = inputMessage.value;
    socket.emit("message", message);
    appendMessage(message);
    inputMessage.value = "";
}


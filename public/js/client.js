////

const socket = io();

socket.on("message", (message) => {
    console.log(message);
    //socket.emit("message", "Hello from client");
    appendMessage(message);
}
);

socket.on("CursorMove", (positionObj) => {
    console.log(positionObj);
    
    const cursorElement = document.getElementById(positionObj.id);
    if (!cursorElement) {
        const cursorElement = document.createElement("img");
        cursorElement.src = "cage.png";
        cursorElement.id = positionObj.id;
        cursorElement.classList.add("cursor");
        cursorElement.classList.add("fadeOut");
        document.body.append(cursorElement);
       
    }
    else{
        cursorElement.classList.remove("fadeOut");

    }


    //update cursor position
    cursorElement.style.left = `${positionObj.position.x}%`;
    cursorElement.style.top = `${positionObj.position.y}%`;

   if(cursorElement.timeout) 
    clearTimeout(cursorElement.timeout);

    cursorElement.timeout = setTimeout(() => {
        cursorElement.classList.add("fadeOut");
    }
    , 1000);



}
);




//DOM manipulation
const messagesContainer = document.getElementById("chat-messages");

const messagesConainerParent = messagesContainer.parentElement;

function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messagesContainer.append(messageElement);

    //scroll to bottom
    messagesConainerParent.scrollTop = messagesConainerParent.scrollHeight;
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


document.addEventListener("mousemove", (event) => {
    const position = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100
    };
    socket.emit("CursorMove", position);
}
);


function sendMessage() {
    const message = inputMessage.value;
    socket.emit("message", message);
    appendMessage(message);
    inputMessage.value = "";
}


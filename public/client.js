const socket = io("ws://192.168.88.20:3000");
const input = document.querySelector(".msg");
const form = document.querySelector("form");
const messages = document.querySelector(".messages");
const nick = prompt("podaj nick");


//client sending message to server
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    socket.emit("message",{nick,"msg":input.value})
    var p = document.createElement("p");
    var span = document.createElement("span")
    
    span.innerHTML="Ja:"+input.value;
    p.style.textAlign="right";
    p.appendChild(span)
    messages.appendChild(p);
    input.value="";
    messages.scrollTop = messages.scrollHeight;
})

//retrieving message from server
socket.on("message", (obj)=>{
    console.log(obj.nick+":"+obj.msg)
    var p = document.createElement("p");
    p.innerHTML=obj.nick+":"+obj.msg;
    messages.appendChild(p);
})
socket.on("connected",()=>{
    alert("nowy użytkownik się połączył")
})

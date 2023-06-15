const socket = io("ws://192.168.88.20:3000");
const input = document.querySelector(".msg");
const form = document.querySelector("form");
const messages = document.querySelector(".messages");
const nick = prompt("podaj nick");



//client sending message to server
form.addEventListener("submit",(e)=>{
    e.preventDefault()
    var p = document.createElement("p");
    var span = document.createElement("span")
    
    //file handling
    var file = document.querySelector(".file").files[0];
    
    var img = document.createElement("img");
    if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', function() {
          img.setAttribute('src', reader.result);
          socket.emit("messageIMG",{nick,"img":reader.result})
          span.innerHTML="Ja:"+input.value;
          p.style.textAlign="right";
          p.appendChild(span)
          p.appendChild(img)
          messages.appendChild(p);
        });
        
        reader.readAsDataURL(file);
        }

    
    if(!file && input.value!==""){
        //sending message
        socket.emit("message",{nick,"msg":input.value})
        span.innerHTML="Ja:"+input.value;
        p.style.textAlign="right";
        p.appendChild(span)
        messages.appendChild(p);
      }
    
    input.value="";
    messages.scrollTop = messages.scrollHeight;
    file=null;

})

//retrieving message from server
socket.on("message", (obj)=>{
    var p = document.createElement("p");
    p.innerHTML=obj.nick+":"+obj.msg;
    messages.appendChild(p);
})
socket.on("messageIMG",(obj)=>{
    var p = document.createElement("p");
    p.innerHTML=obj.nick+":"+"<img src='"+obj.img+"'></img>"
    messages.appendChild(p);
})


socket.on("connected",()=>{
    alert("nowy użytkownik się połączył")
})

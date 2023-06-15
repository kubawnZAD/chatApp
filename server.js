const express = require('express');
const app = express();
const PORT = 3000;
const http = require("http")
const server = http.createServer(app)
const io = require("socket.io")(server, {
    "cors":"*"
  });
  
  io.on("connection", (socket) => {
    socket.broadcast.emit("connected")
    console.log("connected to: "+socket)
    socket.on("message",(obj)=>{
        socket.broadcast.emit("message",obj)
    })
    socket.on("messageIMG",(obj)=>{
      socket.broadcast.emit("messageIMG",obj)
    })
    
    
  });

  
  

app.use(express.static('public'))
app.get("/",(req,res)=>{
    res.sendFile("public/index.html")
})
  
server.listen(PORT, (error) =>{
    console.log(`Server running on http://localhost:${PORT}`)
}
);
const express = require("express")
const { createServer }  = require("node:http")
const {Server} = require("socket.io")
const cors = require("cors")


const app = express()
const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})
io.on("connection", (socket) =>{
    console.log("Usuario conectado")

    socket.emit("message", "Holi UwU")
    socket.on("message", (message) => {
        socket.emit("Confirmation", "Mensaje enviado")
        socket.broadcast.emit("message", "Enviaron esto: " + message)
        
    })
})

app.get("/", (req, res) => {
    res.send("Hello world")
})

server.listen(3000, () => {
    console.log("Estoy corriendo")
})
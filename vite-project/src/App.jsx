import { useEffect } from "react"
import { useState } from "react"
import {io} from "socket.io-client"


function App(){
  const[socket, setSocket] = useState()
  const[inputMessage, setInputMessage] = useState()
  const [menesajesRecibidos, setMensajeRecibido] = useState([])
  const [user, setUser] = useState("")
  useEffect( () => {
    const newSocket = io("http://192.168.251.78:3000")
    setSocket(newSocket)

    newSocket.on("message", (msg) =>{
      setMensajeRecibido(msg)
    })

    setUser(prompt("Ingrese su nombre"))


    return () => {
      newSocket.disconnect()
    }

  }, [])

  const hadleSubmit = (e) => {
    e.preventDefault()
    if(socket){
      socket.emit("message", {
        user,
        inputMessage,
        hour: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
  })
      }
      )
    }

  }
  return (
    <div>
      <form onSubmit={hadleSubmit}>
        <input type="text" placeholder="Escribe el mensaje"
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ul>
        {menesajesRecibidos.map( mensaje => <li>{mensaje.user}: {mensaje.inputMessage}
            <small> ({mensaje.hour}) </small>
        </li>)}
        
      </ul> 
    </div>
  )
}

export default App
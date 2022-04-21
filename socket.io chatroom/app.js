const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


app.use(express.static('public'))

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/views/index.html')
})


io.on('connection', (socket)=>{
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
    io.emit('user-disconnected') 
  })

  socket.on('user-connect', (user)=>{
    io.emit('user-connect', user)
  })

  socket.on('message', (message)=>{
    io.emit('message', message)
  })

  socket.on('is-typing', (user)=>{
    io.emit('is-typing', user)
  })

  socket.on('stop-typing', (user)=>{
    io.emit('stop-typing', user)
  })

})

http.listen(3000, ()=> console.log('listening on port 3000. http://localhost:3000'))

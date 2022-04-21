const socket = io()

const messages = document.querySelector('ul')
const chatInput = document.querySelector('input[type="text"]')
const form = document.querySelector('form')
const username = prompt("What is your username") || `user${new Date().getTime()}`

form.addEventListener('submit', sendMessage)
chatInput.addEventListener('keyup', typing)

socket.emit('user-connect', username)
socket.on('message', renderMessage)
socket.on('user-connect', connectedUser)
socket.on('is-typing', isTyping)
socket.on('stop-typing', stopTyping)

document.body.insertAdjacentText('beforeend', `Chatting as: ${username}`)

function renderMessage(msg) {
  const user = msg.user === username ? 'You' : msg.user
  messages.insertAdjacentHTML('beforeend', `
    <li>${user}: ${msg.message}</li>
  `)
  messages.scrollTo(0, messages.scrollHeight)
}

function sendMessage(e) {
  e.preventDefault()
  if(!chatInput.value) return
  socket.emit('message', {user: username, message: chatInput.value})
  chatInput.value = ''
}

function connectedUser(user) {
  if(user === username) return
  const p = document.createElement('p')
  p.innerHTML = `<p><b>${user}</b> Just joined the chat</p>`
  document.body.appendChild(p)

  setTimeout(()=>{
    document.body.removeChild(p)
  }, 2000)
}

let isUserTyping = false

function typing(e) {
  const value = e.target.value 
  if(value && !isUserTyping) {
    isUserTyping = true
    socket.emit('is-typing', username)
  } else if(!value && isTyping){
    isUserTyping = false
    socket.emit('stop-typing', username)
  }
}

function isTyping(user) {
  if(user === username) return
  const p = document.createElement('p')
  p.innerHTML = `<b>${user}</b> is typing...` 
  p.classList.add(user)
  insertAfter(messages, p)
}

function stopTyping(user) {
  const el = document.querySelector(`.${user}`)
  if(el) el.remove()
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

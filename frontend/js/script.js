const login=document.querySelector(".login")
const loginForm=login.querySelector(".login__form")
const loginInput=login.querySelector(".login__input")


const chat=document.querySelector(".chat")
const chat__messages=chat.querySelector(".chat__messages")
const chatForm=chat.querySelector(".chat__form")
const chatInput=chat.querySelector(".chat__input")


const user = {id:"",name:"",cor:""}

const colors=[
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

let websocket

const createMessageSelfElement = (content)=>{
    const div =document.createElement("div")
    div.classList.add("message--self")
    div.innerHTML = content
    return div

}

const createMessageOtherElement = (content,sender,senderColor)=>{
    const div = document.createElement("div")
    const span = document.createElement("span")
    
    div.classList.add("message--others")
    span.classList.add("message--sender")
    div.appendChild(span)
    span.innerHTML = sender
    span.style.color = senderColor
    div.innerHTML += content
    return div

}
const getRandomColor=()=>{
    const randoIndex = Math.floor(Math.random() * colors.length)
    return colors[randoIndex]
}
const scrollSceren = ()=>{
    window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"})
}

const processMessage = ({data}) => {
    const {userId,userName,userColor,content} = JSON.parse(data)
    console.log(userId, user.id)
    const message =
    userId.toString() == user.id.toString()
        ? createMessageSelfElement(content)
        : createMessageOtherElement(content, userName, userColor)

        chat__messages.appendChild(message)
        scrollSceren()
}

const handleLogin = (event)=>{
    event.preventDefault()
    user.name = loginInput.value
    user.id = crypto.randomUUID()
    user.cor = getRandomColor()
    login.style.display = "none"
    chat.style.display = "flex"
    websocket = new WebSocket("wss://chat-x9d9.onrender.com")
    websocket.onmessage = processMessage
}

loginForm.addEventListener("submit",handleLogin)
 
const sendMessage = (event)=>{
    event.preventDefault()
    const message = {
        userId:user.id,
        userName:user.name,
        userColor:user.cor,
        content:chatInput.value
    }
    websocket.send(JSON.stringify(message))
    chatInput.value = ""
}
chatForm.addEventListener("submit",sendMessage)

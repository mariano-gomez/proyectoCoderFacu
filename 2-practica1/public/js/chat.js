const socket = io() //lo cargo de un elementro script en el html

const messagesEl = document.querySelector('#messages')
const inputElement = document.querySelector('.inputBox input')
inputElement.placeholder = "write your message and press Enter to send it...";

const castDate = function (stringfecha) {
  const date = new Date(stringfecha)
  const hora = date.getHours()
  const minuto = date.getMinutes()

  return `${hora}:${minuto}`
}

const appendMessageElement = ({ user, message, createdAt }) => {
  const time = castDate(createdAt)
  const username = user.split('@')[0].toLowerCase()
  const div = document.createElement('div')
  div.classList.add('uk-width-1-1')
  div.innerHTML = `(${time})\t<span class="uk-label">${username}</span>\t<span class="uk-margin-left">${message}</span>`
  messagesEl.appendChild(div)
}

messagesEl.innerHTML = ''

const getMessages = async function () {
  fetch('http://localhost:8080/api/messages/', {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud')
      }
      return response.json()
    })
    .then((data) => {
      const prevM = data.messages //aca tengo un array con todos los mensajes que traigo de la BD
      prevM.forEach((m) => {
        appendMessageElement(m)
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

getMessages()

async function mostrarAlerta() {
  const { value: user } = await Swal.fire({
    title: 'Ingrese su email',
    input: 'email',
    inputLabel: 'tu direccion de email',
    inputPlaceholder: 'Ingrese su email',
    inputAttributes: {
      autocapitalize: 'off',
    },
  })

  if (user) {
    Swal.fire(`Seras llamado: ${user.split('@')[0]}`)
  }

  inputElement.addEventListener('keydown', function (event) {
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter ') &&
      inputElement.value != ''
    ) {

      const msg = { user, message: inputElement.value, createdAt: new Date()  }
      socket.emit('message', msg)
      appendMessageElement(msg)
      inputElement.value = ''
    }
  })
}

mostrarAlerta()

//aca recibo y pinto los msg de los otros clientes
socket.on('message',(msg)=>{
  console.log(msg)
  appendMessageElement(msg)
})
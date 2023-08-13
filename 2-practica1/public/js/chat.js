const socket = io() //lo cargo de un elementro script en el html

const messagesEl = document.querySelector('#messages')
const inputElement = document.querySelector('.inputBox input')


const castDate = function(stringfecha){
const date = new Date(stringfecha)
const hora = date.getHours();
const minuto = date.getMinutes();

return `${hora}:${minuto}`;
}

const appendMessageElement = ({user,message,createdAt}) => {
  const time = castDate(createdAt)
  const username = user.split("@")[0].toLowerCase()
  console.log(username)
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
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    return response.json();
  })
  .then(data => {
    const prevM = data.messages //aca tengo un array con todos los mensajes que traigo de la BD
    prevM.forEach(m => {
      appendMessageElement(m)
    })
  })
  .catch(error => {
    console.error(error);
  });
  
}

getMessages()

Swal.fire({
  title: 'Ingresa tu nombre',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  confirmButtonText: 'Enviar',
  preConfirm: (username) => {
    // agregar logica
    if (!username) {
      Swal.showValidationMessage(
        `El usuario no puede estar en blanco`
      )
      return
    }
    
    return username
  },
  allowOutsideClick: false
})
// .then(({ value }) => {
//   username = value
//   socket.emit('user', { user: username, action: true })

//   // aqui voy a renderizar los mensajes actuales del server

//   for (const { user, datetime, text } of currentMessages) {
//     // renderizar
//     appendMessageElement(user, datetime, text)
//   }

//   socket.on('chat-message', ({ user, datetime, text }) => {
//     // renderizar el mensaje
//     appendMessageElement(user, datetime, text)
//   })

//   socket.on('user', ({ user, action }) => {
//     appendUserActionElement(user, action)
//   })


//   inputElement.addEventListener('keyup', ({ key, target }) => {
//     if (key !== 'Enter') {
//       return
//     }

//     const { value } = target

//     if (!value) {
//       return
//     }

//     // enviar el mensaje al socket
//     const fecha = new Date()

//     const msg = { user: username, datetime: fecha.toLocaleTimeString('en-US'), text: value }

//     socket.emit('chat-message', msg)
//     target.value = ""
//     appendMessageElement(username, fecha.toLocaleTimeString('en-US'), value)
//   })
// })


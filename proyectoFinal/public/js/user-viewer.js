const btnGetInfo = document.getElementById('btn-get-info')
const btnChangeRole = document.getElementById('btn-change-role')
const btnDeleteuser = document.getElementById('btn-delete-user')

const userInfo = document.getElementById('user-info')
userInfo.innerHTML = 'Any user ID sended'

const input = document.getElementById('userId')

//funcion para obtener valores
const getUserInfo = async (event) => {
  const response = await fetch(
    `http://localhost:8080/api/users/info/${input.value}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  const UserDataJson = await response.json()
  let textToShow = ``
  for (let key in UserDataJson) {
    textToShow += `<div>${key}: ${UserDataJson[key]}</div>`
  }
  userInfo.innerHTML = textToShow
}

// Obtener los datos de un user.
btnGetInfo.addEventListener('click', getUserInfo)

// funcion para cambiar el role.
const changeRole = async (event) => {
  const response = await fetch(`http://localhost:8080/api/users/premium`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId: input.value }),
  })
}

//cambio el role y pido de nuevo la data para mostrar el cambio.
btnChangeRole.addEventListener('click', async (event) => {
  await changeRole(event)
  await getUserInfo(event)
})

//eliminar un usuario
btnDeleteuser.addEventListener('click', async (event) => {
  await fetch(
    `http://localhost:8080/api/users/${input.value}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
  
  let textToShow = `user "${input.value} was deteled"`
  userInfo.innerHTML = textToShow
})

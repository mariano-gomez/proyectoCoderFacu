
const btnGetInfo = document.getElementById('btn-get-info')
const btnChangeRole = document.getElementById('btn-change-role')
const btnDeleteuser = document.getElementById('btn-delete-user')

const userInfo = document.getElementById('user-info')
userInfo.innerHTML = 'Any user ID sended'

const input = document.getElementById('userId')

btnGetInfo.addEventListener('click', async (event) => {
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
  console.log(UserDataJson)
  let textToShow = ``
  for (let key in UserDataJson) {
    textToShow += `<div>${key}: ${UserDataJson[key]}</div>`
  }
  userInfo.innerHTML = textToShow
})

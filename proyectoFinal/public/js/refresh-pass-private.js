console.log('hola mundo')
const pass1 = document.getElementById('password1')
const pass2 = document.getElementById('password2')
const btn = document.getElementById('btn-send')
pass1.value = '' //si no hago esto aparece un valor de pass por defecto .. nose de donde sale.
// pass2.value = ''

btn.disabled = true
btn.style.backgroundColor = 'tomato'
btn.style.color = 'black'

pass2.addEventListener('input', () => {
  console.log('lenght:', pass1.value.length)
  if (pass1.value === pass2.value && pass1.value.length > 0) {
    console.log('se puede enviar pass')
    btn.style.backgroundColor = 'green'
    btn.style.color = 'white'
    btn.disabled = false
  } else {
    console.log('deshabilitado')
    btn.style.backgroundColor = 'tomato'
    btn.style.color = 'black'
    btn.disabled = true
  }
})

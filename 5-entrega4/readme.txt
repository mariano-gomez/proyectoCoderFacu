tenes q sacarle el Mayra al nombre del archio Mayra.env, para tener las nuevas variables de entorno.

respecto a los roles.. antes los roles no estaban en la BD y ahora si.. 
pero a considerar:
    - siempre el que se loguee con adminCoder@coder.com, va a ser "admin", osea que si alguien le modifica el role en la BD, igualmente va a tener privilegios de admin. 
    - el resto de los mails, van a ser "user","premium" o "admin" segun sea el rol de la BD, en estos casos, si se modica el role admin de algun usuario, va a perder sus privilegios.

-para restaurar el mail, logicamente se debe haber creado el user con el mail al que se va a restituir.

Para crear/eliminar/modificar un producto entrar (estando logueado como admin a 'realtiemproducts' y abajo estan los los formularios para las 3 acciones), se puede entrar desde el navBar (solo es visible para admins o premium) o la url es: http://localhost:8080/realtimeproducts

usuarios admin:
 facu@gmail.com  pass:123
 adminCoder@coder.com pass: 123

usuarios premium: 
 martin@gmail.com pass: 123
 productos de martin:
    653bda365ed7bfb2ec319c6c
    653bda475ed7bfb2ec319c72

para cambiar de role, entre "user" y "premium" se tiene q estar logueado como admin. 
si bien deberia ser mediante una solicitud, lo hice con un 'GET' para poder hacer la peticion desde el navegador, por que no se como hacer mandar a traves de postman, para verificar via passport que soy un admin. podria hacerla con post, pero tendria q crear una nueva vista para poder probarla por eso no lo hice.. 
git add

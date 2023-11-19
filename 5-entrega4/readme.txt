tenes q sacarle el Mayra al nombre del archio Mayra.env, para tener las nuevas variables de entorno.

para probar el uploader tenes q entrar a la ruta "http://localhost:8080/uploader", para esta ruta tenes q estar autenthicado
ahi hay 3 formularios.. 
1er form: 
para subir la foto de producto, tenes q poner el productID,
y la imagen (si no es una imagen tira error.. ) y lo guarda en la carpeta de /public/media/productsPhotos
el nombrese sera el productID concatenada con la fecha actual en milisegundos (no se verifica nada del ProductID, se deberia mejorar en este aspecto, pero bueno.. por ahora puede ser cualquier string el Id, deberia cotejarse q exisita y pertenezca al usuario loggueado.)
2do form: 
para subir la imagen de perfil.. se guarda en /public/media/profilePhotos, si no es una imagen devuelve error.
el nombre del archivo va a ser el userId, si el usuario sube una foto diferente, esta se reemplaza(siempre y cuando tengan la misma extension, pq sino crea las dos.. se deberia mejorar eso pero bueno.)
3er form:
es para subir cualquier tipo de archivo, las imagenes iran a /public/images.. los audios a public/audios y asi.. 
el nombre sera el userId concatenado con la fecha en ms y la extension correspondiente segun el tipo de archivo

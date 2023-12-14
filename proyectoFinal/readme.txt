1 - Al archivo PROFES.env, estan las varaibles de entorno, cambiar el nombre a ".env"

2 - En la mayoria de los casos (salvo los users creados por la tutora Mayra), la contraseña para loggearse es "123" (incluso para loggearse con adminCoder@coder.com)
    Acá les facilito algunos usuarios, para que puedan corregir. 
    mail --> "pass" --> role --> id (para que puedan probar la vista "User viewer |admins only|" que aparece en el nav bar cuando se loggea un admin)
    adminCoder@coder.com ---> "123" --> admin --64f62d50df991b6ebb3cb579 (es admin NO se le puede cambiar el rol)
    castellanofacundo@gmail.com --> "123" --> admin --> 651302bb7a2fce5a30d4fe71 (es admin NO se le puede cambiar el rol)

    martin@gmail.com ---> "123" --> premium --> 64f6332b6d04bb39390190c6 (desde la vista user viewer se le puede switchear el rol (demora un poco pero lo hace, y trae la info actualzada))
    euge@gmail.com ---> "123" --> user --> 64f633a93f17e25e0c54acf0 (idem anterior)
    *ambos usuarios anteriores, tienen en su carrito algunos items. para poder realizar el ticket de compra de forma inmediata, 
     luego de realizar esta compra. se puede volver al home y realizar la carga de productos al carrito nuevamenta.

3 - Les dejo el archivo "thunder-collection_coder-ProyectoFinal.json" para que lo importen en thunderclient, y prueben los endpoint 
    para obtener la info de todos los usuarios y el de eliminar los usuarios inactivos. (esta seteado a 2 dias de la ultima conexion)
    todos los user tienen ultima conexion 14/dic, por lo que si lo ejecutan despues va a borrar todos.
    (es facil ampliarle el tiempoLimite a los dias que quieran y probar modificando un last_connection de uno o dos users en la BD para probarlo)

4 - No se implemnto stripe, por lo que el proceso de compra se realiza con el endpoit que genera los ticket, realizado para una entrega anterior.

5 - Este proyecto se hizo como continuacion de las entregas anteriores, por lo que hay archivos que quizas no sean necesarios, pero en ningun caso estos archivos perjudican al funcionamiento del proyecto.

6 - Debido a la naturaleza del curso, no se le presto atencion al diseño, se hizo lo minimo para que fuese facil de ver la las funcionalidades.


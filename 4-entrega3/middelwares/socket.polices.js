class SocketPolices {
  static prueba = (socket, next) => {
    
    //aca puedo hacer lo q quiera con el request del socket
    
    // const request = socket.request
    // const requestKey = Object.keys(socket.request)
    // console.log(requestKey)
    // console.log(request.user)
    
    next()
  }
}

module.exports = SocketPolices
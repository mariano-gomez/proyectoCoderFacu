class SocketPolices {
  static prueba = (socket, next) => {
    console.log("----------------------------1---------------------------")
    const request = socket.request
    const requestKey = Object.keys(socket.request)
    console.log(requestKey)
    console.log(request.user)
    console.log(request.sessionID)
    const cookie = socket.request.headers.cookie
    // console.log(cookie)
    // const connectSid = cookie.split("connect.sid=")[1]
    // console.log(connectSid)
    console.log("----------------------------1---------------------------")
    next()
  }
}

module.exports = SocketPolices
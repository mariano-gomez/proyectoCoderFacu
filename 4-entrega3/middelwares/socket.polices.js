class SocketPolices {
  static prueba = (socket, next) => {
    console.log("----------------------------1---------------------------")
    const cookie = socket.request.headers.cookie
    console.log(cookie)
    const connectSid = cookie.split("connect.sid=")[1]
    console.log(connectSid)
    console.log("----------------------------1---------------------------")
    next()
  }
}

module.exports = SocketPolices
const writeBody = (token)=>{
  return (
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
          }
    
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
    
          h1 {
            color: #333;
            text-align: center;
          }
    
          p {
            color: #777;
            line-height: 1.5;
          }
    
          .button {
            display: inline-block;
            background-color: #74b6c3;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }
    
          .button:hover {
            background-color: #7671bd;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset</h1>
          <p>
            Through this email, you will be able to reset your password. To do so,
            click on the "Reset Password" button below:
          </p>
          <a class="button" href="http://localhost:8080/refresh-pass-private?token=${token}"
            >Reset Password</a
          >
        </div>
      </body>
    </html>`
  )
}

module.exports = writeBody
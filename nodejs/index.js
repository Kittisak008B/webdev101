// Imports the built-in http module in Node.js, which is used to create an HTTP server.
const http = require('http')

const host = 'localhost'
const port = 8000 // localhost:8000


const requestListener = function (req, res) {
  res.writeHead(200) //sets the HTTP status code to 200 (OK).
  res.end("My first server!") //sends a response message, "My first server!", back to the client.
}

// run server
const server = http.createServer(requestListener) //creates an HTTP server that uses the requestListener function to handle requests.
server.listen(port, host, () => {     //server.listen(port, host, callback) starts the server and listens for incoming requests at http://localhost:8000
    console.log(`Server is running on http://${host}:${port}`) //The callback function logs "Server is running on http://localhost:8000" to the console when the server starts successfully.
})
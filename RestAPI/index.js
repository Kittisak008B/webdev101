const express = require('express')  //imports the Express framework, which simplifies creating web servers in Node.js

const app = express()
const port = 8000

const bodyParser = require('body-parser')
app.use(bodyParser.json()) //Middleware to parse JSON bodies
let users = []
let counter = 1 

app.get('/', (req, res) => { //define a route for HTTP GET requests to the root URL ("/")
  res.send('Hello World!')
})

app.get('/user', (req, res) => {
  res.json({
    firstname: 'Sam',
    lastname: 'Bankman',
    age: 30
  });
})

app.get('/users' , (req , res) =>{
  res.json(users)
})

//post -> creating a new resource
app.post('/user', (req, res) => { 
  let user = req.body
  user.id = counter 
  counter += 1
  users.push(user)
  res.status(201).json({ message: 'User created successfully', user: user })
})

//put -> updating an existing resource  (replace the entire resource with new data)
app.put('/user/:id' , (req , res) => {
  let id = req.params.id  //extracting the `id` from the URL parameter
  let data = req.body

  let selectedIndex  = users.findIndex((user) => user.id == id)
  let userToUpdate = users[selectedIndex] //get the user from the array
  if (!userToUpdate) {
    return res.status(404).json({ message: 'User not found' })
  }

  //update user properties with the new data, or keep existing values if no new data is provided
  userToUpdate.firstname = data.firstname || userToUpdate.firstname
  userToUpdate.lastname = data.lastname || userToUpdate.lastname
  userToUpdate.age = data.age || userToUpdate.age

  //return the updated user data along with the index that was updated
  res.json({ message: 'User updated successfully', data: {user : userToUpdate , indexUpdate : selectedIndex} })
})

//patch -> update only specific fields of the resource
app.patch('/user/:id' , (req , res) => {
  let id = req.params.id
  let data = req.body

  let selectedIndex  = users.findIndex((user) => user.id == id)
  let userToUpdate = users[selectedIndex] 
  if (!userToUpdate) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (data.firstname) {
    userToUpdate.firstname = data.firstname 
  }
  if (data.lastname) {
    userToUpdate.lastname = data.lastname
  }
  if (data.age) {
    userToUpdate.age = data.age
  }
  res.json({ message: 'User updated successfully', data: {user : userToUpdate , indexUpdate : selectedIndex} })
})

//delete -> remove a user by id
app.delete('/user/:id', (req , res) => {
  let id = req.params.id
  let selectedIndex  = users.findIndex((user) => user.id == id)

  if (selectedIndex >= 0 && selectedIndex < users.length) { //check if the index is valid
    users.splice(selectedIndex , 1) //remove the user at the specified index
    res.json({ message: 'User deleted successfully', idDeleted: parseInt(id) , indexDeleted: selectedIndex})
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

//start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
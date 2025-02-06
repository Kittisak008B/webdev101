/*
The API consists of 5 paths:

GET /users – Retrieve all saved users.
POST /users – Create and save a new user.
GET /users/:id – Retrieve a specific user by ID.
PUT /users/:id – Update a specific user by ID.
DELETE /users/:id – Delete a specific user by ID.
*/
const express = require('express')  
const bodyParser = require('body-parser')

const port = 8000
const app = express()
app.use(bodyParser.json()) 
let users = []
let counter = 1

//GET /users – Retrieve all saved users.
app.get('/users' ,(req , res) => {
    const filterUsers = users.map(user => {
        return {
            id: user.id,
            firstname: user.firstname ,
            lastname: user.lastname ,
            fullname: user.firstname + ' ' + user.lastname
        }
    })
    res.json(filterUsers)
})

//POST /users – Create and save a new user.
app.post('/users' , (req,res) => {
    let user = req.body
    user.id = counter
    counter += 1
    users.push(user)
    res.status(201).json({ message: 'User created successfully', user: user })
})

//GET /users/:id – Retrieve a specific user by ID.
app.get('/users/:id' , (req , res) => {
    let id = req.params.id
    let selectedIndex = users.findIndex((user) => user.id == id)
    if(selectedIndex !== -1){
        res.json(users[selectedIndex])
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

//PUT /users/:id – Update a specific user by ID.
app.put('/users/:id' , (req , res) => {
    let id = req.params.id
    let data = req.body
    let user = users.find((user) => user.id == id) 
    if(user){
        user.firstname = data.firstname || user.firstname
        user.lastname =  data.lastname || user.lastname
        user.age = data.age || user.age
        res.json({ message: 'User updated successfully', user: user })
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

//DELETE /users/:id – Delete a specific user by ID.
app.delete('/users/:id' , (req , res) => {
    let id = req.params.id
    let selectedIndex = users.findIndex((user) => user.id == id)
    if(selectedIndex >= 0 && selectedIndex < users.length){
        users.splice(selectedIndex , 1)
        res.json({ message: 'User deleted successfully', idDeleted: parseInt(id) , indexDeleted: selectedIndex})
    } else {
        res.status(404).json({ error: 'User not found' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
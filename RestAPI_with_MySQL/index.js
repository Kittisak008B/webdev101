const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')

const port = 8000
const app = express()
app.use(bodyParser.json())
let conn = null 

const connectMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'test_database',
        password: '12345' ,
        port : 3307
    })
}

app.get('/users' , async (req , res) => { //route handler for getting all users
    try {
        let results = await conn.query('SELECT * FROM users')
        res.json(results[0])
    }  catch(error) {
        console.error('Error fetching users:', error.message)
        res.status(500).json({ error: 'Error fetching users' })
    }
})

app.post('/users' , async (req ,res) => { //create a new user
    try {
        let user = req.body
        const result = await conn.query('INSERT INTO users SET ?', user)
        res.status(201).json({message: 'User created successfully'})
    } catch (error){
        console.error('Error creating user:', error.message)
        res.status(500).json({ error: 'Error creating user' })
    }
})

app.get('/users/:id' , async (req , res) => { //get a specific user by id
    try {
        let id = req.params.id
        const result = await conn.query('SELECT * FROM users WHERE id = ? ' , id)
        if (result[0].length === 0 ) {
            throw { statusCode: 404, message: 'User ID not found' }
        }
        res.json(result[0][0])
    } catch (error) {
        console.error('Error fetching user:', error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({ message: 'Error fetching user', errorMessage: error.message })
    }
})

app.put('/users/:id', async (req, res) => { //update a specific user by id
    try {
        let id = req.params.id
        let updateUser = req.body
        const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id])
        if (result[0].affectedRows === 0) {
            throw {statusCode: 404, message: 'User ID not found'}
        }
        res.json({message: 'User updated successfully', userId: parseInt(id) })
    } catch (error) {
        console.error('Error updating user:', error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({message: 'Error updating user', errorMessage: error.message })
    }
})

app.delete('/users/:id' , async (req ,res) => { //delete a specific user by id
    try{
        let id = req.params.id
        const result = await conn.query('DELETE FROM users WHERE id = ? ' , id)
        if(result[0].affectedRows === 0) {
            throw {statusCode: 404 , message: 'User ID not found'}
        }
        res.json({message: 'User deleted successfully' , userId: parseInt(id)})
    }catch (error){
        console.error('Error deleting user:' , error.message)
        let statusCode = error.status || 500
        res.status(statusCode).json({message: 'Error deleting user' , errorMessage: error.message})
    }

})

//start the server and listen on the specified port
app.listen(port, async () => {
    await connectMySQL()
    console.log(`Server is running on port ${port}`)
})
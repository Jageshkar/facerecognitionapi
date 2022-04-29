const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'facedetection'
    }
  });
const register = require('./Controllers/register');
const signin = require('./Controllers/signin')
const profile = require('./Controllers/profile')
const image = require('./Controllers/image')


const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Success")
})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, bcrypt, knex)})

app.post('/register', (req, res) => {register.handleRegister(req, res, bcrypt, knex)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, knex)})

app.put('/image', (req, res) => {image.handleImage(req, res, knex)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})
const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')

const app = express()
env.config();
const PORT = process.env.PORT||5000
const todoRoute = require('./router/todorouter')

app.use(express.json())

app.use('/api/todo', todoRoute)

app.get('/',function(req,res){
    res.send("working")
})
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Failed to connect to database.'));



app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})


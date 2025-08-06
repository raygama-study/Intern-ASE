const express = require('express')
const conn = require('./src/helpers/db')
const bodyParser = require('body-parser')
const app = express()
const port = 3030

//import routes
const pingRouter = require("./src/routes/pingRoute")

app.use(bodyParser.json())

//ping routes
app.use('/', pingRouter)

app.get('/', (req, res) => {
  res.send('Hello World!??!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
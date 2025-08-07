const express = require('express')
const conn = require('./src/helpers/db')
const bodyParser = require('body-parser')
const app = express()
const port = 3030

//import routes
const pingRouter = require("./src/routes/pingRoute")
const storiesRouter = require("./src/routes/storiesRoute")
const reportsRouter = require("./src/routes/reportsRoute")
const categoriesRouter = require("./src/routes/categoriesRoute")

app.use(bodyParser.json())

//ping routes
app.use('/', pingRouter)

//stories routes
app.use('/', storiesRouter)

//reports routes
app.use('/', reportsRouter)

//categories routes
app.use('/', categoriesRouter)

app.get('/', (req, res) => {
  res.send('Hello World!??!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3030

//import routes
const pingRouter = require("./src/routes/pingRoute")
const storiesRouter = require("./src/routes/storiesRoute")
const reportsRouter = require("./src/routes/reportsRoute")
const categoriesRouter = require("./src/routes/categoriesRoute")
const commentsRouter = require("./src/routes/commentsRoute")
const authRouter = require("./src/routes/authRoute")

app.use(bodyParser.json())

//ping routes
app.use('/', pingRouter)

//stories routes
app.use('/', storiesRouter)

//reports routes
app.use('/', reportsRouter)

//categories routes
app.use('/', categoriesRouter)

//comments routes
app.use('/', commentsRouter)

//auth routes
app.use('/', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!??!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
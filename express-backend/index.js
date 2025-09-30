const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3030

app.use(cors({origin: 'http://localhost:5173', credentials: true}))

//import routes
const pingRouter = require("./src/routes/pingRoute")
const storiesRouter = require("./src/routes/storiesRoute")
const categoriesRouter = require("./src/routes/categoriesRoute")
const commentsRouter = require("./src/routes/commentsRoute")
const authRouter = require("./src/routes/authRoute")

app.use(bodyParser.json())

//ping routes
app.use('/', pingRouter)

//stories routes
app.use('/', storiesRouter)

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
process.env.NODE_ENV !== 'production' && require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const { connectToDatabase } = require('./db')
const controllers = require('./controllers')

const startServer = async () => {
  try {
    const app = express()

    // Middleware
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))
    app.use(express.static('public'))
    app.set('view engine', 'ejs')

    // DB
    await connectToDatabase()

    // Routes
    app.get('/', async (req, res) => {
      res.render('index')
    })

    // Listen
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log(`> Server live on port ${PORT}.`))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

startServer()

process.env.NODE_ENV !== 'production' && require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const { connectToDatabase } = require('./db')
const controllers = require('./controllers')

let retryCount = 0

const startServer = async () => {
  const app = express()

  // Middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'))
  app.use(express.static('public'))
  app.set('view engine', 'ejs')

  try {
    // DB
    await connectToDatabase()
  } catch (err) {
    console.error(err)
    if (retryCount < 3) {
      console.log('> Retrying in 2 seconds...')
      setTimeout(startServer, 2000)
      retryCount++
      return
    }
    process.exit(1)
  }

  // Routes
  app.get('/', controllers.index)
  app.post('/add', controllers.addReminder)

  // Listen
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`> Server live on port ${PORT}.`))
}

startServer()

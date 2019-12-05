const dbClient = require('./models')

const connectToDatabase = async () => {
  try {
    await dbClient.sequelize.sync()
    console.log('> Connected to database!')
  } catch (err) {
    console.error('> Could not connect to database!')
    throw err
  }
}

module.exports = { dbClient, connectToDatabase }

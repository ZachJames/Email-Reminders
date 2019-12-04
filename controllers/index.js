const emailValidator = require('email-validator')

const { Reminder } = require('../db/models')

exports.index = async (req, res, next) => {
  try {
    const totalReminders = await Reminder.count()
    res.render('index', { totalReminders })
  } catch (err) {
    next(err)
  }
}

exports.addReminder = async (req, res, next) => {
  try {
    console.log(req.body)

    if (!bodyIsValid(req.body)) {
      const error = 'Please check that you have filled out the form correctly.'
      return res.redirect(`/?error=${error}`)
    }
    res.send('good')
  } catch (err) {
    next(err)
  }
}

function bodyIsValid(body) {
  if (!body.text || body.text.length < 1) {
    return false
  }

  if (!body.forEmail || !emailValidator.validate(body.forEmail)) {
    return false
  }
  return true
  // date
}

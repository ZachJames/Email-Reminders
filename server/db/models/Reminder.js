module.exports = (sequelize, types) => {
  const Reminder = sequelize.define(
    'Reminder',
    {
      text: {
        type: types.TEXT,
        allowNull: false,
      },
      forEmail: {
        type: types.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
      hourToSend: {
        type: types.INTEGER,
        allowNull: false,
      },
    },
    {}
  )

  return Reminder
}

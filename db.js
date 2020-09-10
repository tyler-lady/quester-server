const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})

sequelize.authenticate()
  .then(
    function(){
      console.log('Connected to redPERN postgres database!')
    }, 
    function(err){
      console.log(err);
    }
  )

User = sequelize.import('./models/user');
Characters = sequelize.import('./models/character');
Attributes = sequelize.import('./models/attribute');

User.hasMany(Characters, {
  onDelete: 'cascade'
})
Characters.belongsTo(User, {
  foreignKey: {
      allowNull: false
  }})
Characters.hasOne(Attributes, {
    onDelete: 'cascade'
})
Attributes.belongsTo(Characters, {
  foreignKey: {
      allowNull: false
  }
})


  module.exports = sequelize;
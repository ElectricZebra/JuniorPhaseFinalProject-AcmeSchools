const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/acmeSchools', { logging: false })

const School = conn.define('school', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    unique: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageURL: Sequelize.TEXT
});

const Student = conn.define('student', {
  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    unique: true,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.FLOAT
  }
});

Student.belongsTo(School);
School.hasMany(Student);


const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const schools = ['Fullstack Academy', 'SDSU', 'HSU', 'Cuesta', 'MiraCosta'];
  await Promise.all(schools.map(name => School.create({ name })));
  await Student.create({
    firstName: 'Nick',
    lastName: 'Regoli',
    email: 'superBotanist@theBest.com',
    gpa: 5.0
  })
  await Student.create({
    firstName: 'JoeBob',
    lastName: 'BobJoe',
    email: 'dontMess@withTheBest.com',
    gpa: 3.9
  })
  await Student.create({
    firstName: 'Susie',
    lastName: 'Regman',
    email: 'sweet@vanillaBean.com',
    gpa: 5.99999
  })
}

module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
}

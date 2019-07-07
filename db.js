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
  const schools = ['SDSU', 'HSU', 'Cuesta', 'MiraCosta'];
  await Promise.all(schools.map(name => School.create({ name })));
  const students = ["Harry", "Larry", "Scary"];
  await Promise.all(students.map(firstName => Student.create({ firstName })));
}

module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
}

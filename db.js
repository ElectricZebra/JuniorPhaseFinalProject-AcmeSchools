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
  await School.create({
    id: "44e28add-af37-42f5-b152-a0044cde8ca3",
    name: "Fullstack Academy",
    imageURL: 'https://pbs.twimg.com/profile_images/1145685694238605312/q4JCNy_X_400x400.jpg'});
  await School.create({
    id: "e5a9c82d-89ce-4dae-9e75-e9c9d908c0d1",
    name: "SDSU",
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Sdsumain.jpg'});
  await School.create({
    id: "c141e7d9-f429-4992-a485-5f0cdd36a042",
    name: "HSU",
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Humboldt_State_University_Entrance.jpg'});
  await School.create({
    id: "97564609-5f68-4dfb-aaad-b434103e7b5a",
    name: "Cuesta",
    imageURL: 'https://www.cuesta.edu/about/images/marketing-images/cclogos/CuestaCollege_logo_ccd_horz_fullcolor_blktxt.jpg'});
  await School.create({
    id: "5b832a5a-2e23-4ad6-b84d-c324aed131de",
    name: "MiraCosta",
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/CLC_%2812997780825%29_%28cropped%29.jpg'});
  await Student.create({
    firstName: 'Harry',
    lastName: 'BigFoot',
    email: 'superBotanist@theBest.com',
    gpa: 5.0,
    schoolId: "44e28add-af37-42f5-b152-a0044cde8ca3"})
  await Student.create({
    firstName: 'JoeBob',
    lastName: 'BobJoe',
    email: 'dontMess@withTheBest.com',
    gpa: 3.9,
    schoolId: "97564609-5f68-4dfb-aaad-b434103e7b5a"})
  await Student.create({
    firstName: 'Susie',
    lastName: 'Regman',
    email: 'sweet@vanillaBean.com',
    gpa: 3,
    schoolId: "97564609-5f68-4dfb-aaad-b434103e7b5a"})
  await Student.create({
    firstName: 'Cool',
    lastName: 'Man',
    email: 'sweet@email.net',
    gpa: 2,
    schoolId: "c141e7d9-f429-4992-a485-5f0cdd36a042"})
  await Student.create({
    firstName: 'Kelly',
    lastName: 'Shralper',
    email: 'getting@tubed.wave',
    gpa: 1.3,
    schoolId: "c141e7d9-f429-4992-a485-5f0cdd36a042"})
}

module.exports = {
  syncAndSeed,
  models: {
    Student,
    School
  }
}


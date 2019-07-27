const express = require('express');
const app = express();
const { syncAndSeed, models, conn } = require('./db');
const { School, Session, Student } = models
const path = require('path')
const port =  process.env.PORT || 3000;
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');

const sessionStore = new SequelizeStore({
  db: conn,
  table: 'session',
  name: 'sessionId'
})

syncAndSeed();

app.use(express.json());

app.use(session({
  secret: 'foxes',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
}))

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log(`listening on port ${port}`));

app.use('/api/students', require('./StudentsRoute'));

app.get('/api/schools', async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.send(schools)
  }
  catch (ex) {
    next(ex)
  }
});

//login routes

app.use(async(req, res, next) => {
  try {
    // console.log(req.session)
    if (req.session.id) {
      const sessionStudent = await Student.findOne({
          where: {
            sessionId: req.session.id
        }
      })
      if (!sessionStudent) {
        res.redirect('/')
      } else {
      req.user = sessionStudent
      next()
      }
    }
  }
  catch (err) {
    next(err)
  }
})

// app.get('/api/sessions', (req, res, next) => {
//   const { firstName, lastName, password } = req.body;
//   try {

//   }
//   catch (err) {
//     next (err)
//   }
// })

// app.post('/api/sessions', async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     if (email && password) {
//       const user = await Student.findOne({
//         where: {
//           email: email,
//           password: password
//         }
//       })
//       await Session.create({
//         sessionId: req.cookies,
//         studentId: user.id
//       })
//     }

//   }
//   catch (err) {
//     next (err)
//   }
// })

// app.delete('/api/sessions', (req, res, next) => {
//   const { firstName, lastName, password } = req.body;
//   try {

//   }
//   catch (err) {
//     next (err)
//   }
// })

app.get('/loginCheck', (req, res, next) => {
  const { firstName, lastName, password } = req.body;
  try {
   console.log('got to loginCheck')
   res.sendStatus(200)
  }
  catch (err) {
    next (err)
  }
})



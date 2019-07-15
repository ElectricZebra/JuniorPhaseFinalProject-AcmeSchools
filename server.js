const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const { Student, School } = models
const path = require('path')

const port =  process.env.PORT || 3000;

syncAndSeed();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => console.log(`listening on port ${port}`));


app.get('/api/students', async (req, res, next) => {
  try {
    res.send(await Student.findAll())
    }
    catch (ex) {
      next(ex)
    }
});

app.post('/api/students', async (req, res, next)=> {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gpa: req.body.gpa
    })
    res.send(newStudent)
  }
  catch (ex){
    next(ex)
  }
})

// app.delete('/api/students:id', async (req, res, next) => {
//   try {
//     await Student.destroy({
//       where: {
//         id: req.params.id
//       }
//     })
//   }
//   catch (ex) {
//     next(ex)
//   }
// })

app.get('/api/schools', async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.send(schools)
  }
  catch (ex) {
    next(ex)
  }
});


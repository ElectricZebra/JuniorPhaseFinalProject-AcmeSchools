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
    res.send(await Student.findAll({
      include: [{
        model: School
      }]
    }))
    }
    catch (ex) {
      next(ex)
    }
});

app.post('/api/students', async (req, res, next)=> {
  try {
    const findSchool = await School.findOne({
      where: {
        name: req.body.schoolName
      }
    })
    await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gpa: req.body.gpa,
      schoolId: findSchool.id
    })
    //TODO figure out a more efficent way to send school data with newStudent
    const studentSchool = await Student.findOne({
      where: {
        email: req.body.email
      },
      include: [{
        model: School
      }]
    })
    res.send(studentSchool)
  }
  catch (ex){
    next(ex)
  }
})


app.delete('/api/students/:id', async (req, res, next) => {
  try {
    await Student.destroy({
      where: {
        id: req.params.id
      }
    })
    res.send()
  }
  catch (ex) {
    next(ex)
  }
})

app.get('/api/schools', async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.send(schools)
  }
  catch (ex) {
    next(ex)
  }
});



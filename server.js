const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const { Student, School } = models

const port =  process.env.PORT || 3000;

syncAndSeed();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/api/students', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students)
    }
    catch (ex) {
      next(ex)
    }
});

app.get('/api/schools', async (req, res, next) => {
  try {
    const schools = await School.findAll();
    res.send(schools)
  }
  catch (ex) {
    next(ex)
  }
});

const express = require('express');
const router = express.Router();
const { models } = require('./db');
const { Student, School } = models

router.get('/', async (req, res, next) => {
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

router.post('/', async (req, res, next)=> {
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

router.post('/:id', async(req, res, next) => {
  try {
    const updateSchool = await Student.findOne({
      where: {
        id: req.params.id
      }
    })
    updateSchool.schoolId = req.body.schoolId
    await updateSchool.save({fields: ['schoolId']})
    const updated = await Student.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: School
      }]
    })
    res.send(updated)
  }
  catch (ex) {
    next(ex);
  }
})



router.delete('/:id', async (req, res, next) => {
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

module.exports = router

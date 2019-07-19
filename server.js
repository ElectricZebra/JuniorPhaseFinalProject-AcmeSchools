const express = require('express');
const app = express();
const { syncAndSeed, models } = require('./db');
const { School } = models
const path = require('path')
const port =  process.env.PORT || 3000;

syncAndSeed();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

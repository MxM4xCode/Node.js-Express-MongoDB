const express = require('express');
const News = require('../models/news');
const router = express.Router();


router.all('*', (req, res, next) => {
  if(!req.session.admin) {
    res.redirect('login');

    return;
  }

  next();
})


/* GET news page. */
router.get('/', async (req, res) => {
  try {
    const data = await News.find({});

    res.render('admin/index', { title: 'Admin', data });
  } catch(err) {
    console.log(err);
    res.status(500).send(err);
  }
});


router.get('/news/add', (req, res) => {
  res.render('admin/news-form', { title: 'Dodaj news', body: {}, errors: {} })
});


router.post('/news/add', async (req, res) => {
  const body = req.body;
  const newsData = new News(body);

  const errors = newsData.validateSync();

  if(errors) {
    return res.render('admin/news-form', {
      title: 'Dodaj news',
      errors,
      body
    });
  }

  await newsData.save();

  res.redirect('/admin');
});


router.get('/news/delete/:id', async (req, res) => {
  try {
    const deleteData = await News.findByIdAndDelete(req.params.id)
  } catch(err) {
    console.log(err);
  }

  res.redirect('/admin');
});

module.exports = router;
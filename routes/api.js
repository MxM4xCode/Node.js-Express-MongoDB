const express = require('express');
const router = express.Router();
const News = require('../models/news');
let defaultSort = -1;

/* GET news page. */
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const sort = req.query.sort || -1;

    if(sort !== -1 && sort !== 1) {
        sort = defaultSort;
    }

    const findNews = await News
    .find({ title: new RegExp(search.trim(), 'i') })
    .sort({ created: sort });


    res.json(findNews);
  } catch(err) {
    console.log(err);
  }

});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const findNews = await News.findById(id);


    res.json(findNews);
  } catch(err) {
    console.log(err);
  }

});

module.exports = router;
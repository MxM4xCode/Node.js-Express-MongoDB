const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

/* GET news page. */
router.get('/', async (req, res) => {
  try {
    const show = !req.session.vote;
    const quizzes = await Quiz.find();
    let sum = 0;
    quizzes.forEach((item) => {
      sum += item.vote;
    })
  

    res.render('quiz', { 
      title: 'Quiz', 
      data: quizzes,
      show: show,
      sum: sum
    });
  } catch(err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const id = req.body.quiz;
    const quizzes = await Quiz.findOne({ _id: id });
    quizzes.vote = quizzes.vote + 1;
    req.session.vote = 1;

    quizzes.save();


    res.redirect('/quiz');
  } catch(err) {
    console.log(err);
  }

  
});

module.exports = router;
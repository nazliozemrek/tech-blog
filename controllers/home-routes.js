const router = require('express').Router();
const  sequelize = require ('../config/connection');
const {Post,User,Comment} = require('../models');

router.get("/", (req, res) => {
    Post.findAll({
      include: [User],
    })
      .then((dbPostData) => {
        const posts = dbPostData.map((post) => post.get({ plain: true }));
  
        res.render("homepage", { 
            posts,
        loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
  router.get('/post/:id', (req, res) => {
    Post.findOne({
    where:{
        id:req.params.id
    },
        include:[
            User,{
                model: Comment,
                include:[User],
            },
        ],       
    }) .then((dbPostData) => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
  
          res.render("single-post", { post });
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  
    
  });
  router.get('/login', (req, res) => {
      if(req.session.loggedIn){
          res.redirect('/');
          return;
      }
    res.render('login');
  });

  router.post('/logout',(req,res) => {
      if(req.session.loggedIn){
          req.session.destroy( () => {
              res.status(204).end();
          });
      }
      else{
          res.status(404).end();
      }
  })
module.exports = router;
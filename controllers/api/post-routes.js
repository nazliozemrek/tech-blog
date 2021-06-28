const router = require('express').Router();
const {Post,User,Comment} = require('../../models');

router.get('/',(req,res)=> {
    Post.findAll({
        attributes:['id','title','created_at'],
        order:[['created_at','DESC']],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','post_id','created_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            }
        ]
    })
    .then(postData => res.json(postData))
    .catch(err => {
        res.status(500).json(err);
    })
})
router.get('/:id',(req,res)=> {
    Post.findOne({
        where:{
            id:req.params.id
        },
        attributes:['id','title','created_at'],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','post_id','created_at'],
                include:{
                    model:User,
                    attributes:['username']
                }
            }
        ]
    })
    .then(postData => {
        if(!postData){
            res.status(404).json({message:'No post'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})
router.post('/',(req,res)=> {
    Post.create({
        title:req.body.title,
        user_id:req.body.user_id
    })
    .then(postData => res.json(postData))
    .catch(err => {
        res.status(500).json(err);
    });
});
router.put('/:id',(req,res)=> {
    Post.update(
        {
            title:req.body.title
        },
        {
            where:{
                id:req.params.id
            }
        }
    )
    .then(postData=>{
        if(!postData){
            res.status(404).json({message:'no post'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});
router.delete('/:id',(req,res) => {
    Post.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(postData => {
        if(!postData){
            res.status(404).json({message:'No post'});
            return;
        }
        res.json(postData);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

module.exports = router;
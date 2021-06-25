const router = require('express').Router();
const { User,Post,Comment } = require('../../models');


router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user' });
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userData => res.json(userData))
        .catch(err => {
            res.status(500).json(err);
        });
});
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks:true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    })
    .then(userData => {
        if(!userData){
            res.status(400).json({message:'no user'})
            return;
        }
        //res.json({user:userData});
        const validPassword = userData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({message:'incorrect pw'});
            return;
        }
        res.json({user:userData,message:'You are now logged in'});
    });
})
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;
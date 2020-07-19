const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      sha1 = require('sha1'),
      fs = require('fs').promises,
      validatorUserCreate = require('./../../validators/users_create');

let { 
    User,
    Post,
    PostCategory
} = require('../../database');

router.post('/api/users/login', async (request, response) => {

    let user = await User.findOne({where: {
        email: request.body.email,
        password: sha1(request.body.password)
    }})

    if (user) {
        request.session.user_id = user.id;
        response.json({status: 200});
    } else {
        response.json({status: 400});
    }

})

router.get('/api/users', async (request, response) => {

    let users = await User.findAll({
        include: [
            { 
                model: Post,
                include: [
                    { model: PostCategory }
                ]
            }
        ]
    });

    response.json(users);

});

router.post('/api/users', validatorUserCreate , (request, response) => {

    User.create({
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        email: request.body.email,
        birth_date: new Date(),
        password: sha1(request.body.password)
    }).then((user) => {
        response.json({status: 201, data: user});
    });

});

router.all('/api/users/:id(\\d+)', (request, response, next) => {

    User.findByPk(request.params.id).then((user) => {

        if (user) {
            request.user = user;
            next();
        } else {
            response.status(404).json({message: "user not found"})
        }

    });

});

router.get('/api/users/:id(\\d+)', (request, response) => {
    response.json(request.user);
});

router.put('/api/users/:id(\\d+)', (request, response) => {

    request.user.update({
        firstname: request.body.firstname,
        lastname:  request.body.lastname
    }).then((user) => {
        response.json(user);
    });

});

router.delete('/api/users/:id(\\d+)', (request, response) => {

    request.user.destroy().then((user) => {
        response.json(user);
    });

});


module.exports = router;
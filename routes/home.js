const express = require('express'),
      router = express.Router(),
      sql = require('../database');
      let { Film } = require('../database')
      let { Genre } = require('../database')
      let { Distributeurs } = require('../database')

router.get('/', (request, response) => {

    console.log(request.current_user);
    if(!request.session.user_id) {
        return response.redirect('/login');
    }

    return response.redirect('/films');
    // response.render('index', {
    //     name: request.current_user.firstname + request.session.user_id,
    //     data: [],
    //     films: [],
    //     distributeurs: [],
    // });

});

router.get('/films', (request, response) => {

    let page = parseInt(request.query.page);
    let limit = parseInt(request.query.limit);
    let order = request.query.order;

    page = page ? page : 1;
    limit = limit ? limit : 20;
    order = order ? order : "id_film";
    
    Film.findAndCountAll({
        limit: limit,
        offset: (page-1) * limit,
        order: [order]
    })
    .then(result => {
        count = result.count
        response.render('film', {
            films: result.rows,
            count: result.count,
            limit: limit,
            order: order
        });
    })
    .catch(err => { response.send(err) })
    .finally(err => response.status(404))
})

router.get('/distributeurs', (request, response) => {

    let page = parseInt(request.query.page);
    let limit = parseInt(request.query.limit);
    let order = request.query.order;

    page = page ? page : 1;
    limit = limit ? limit : 20;
    order = order ? order : "id_distributeur";
    
    Distributeurs.findAndCountAll({
        limit: limit,
        offset: (page-1) * limit,
        order: [order]
    })
    .then(result => {
        count = result.count
        response.render('distributeurs', {
            distributeurs: result.rows,
            count: result.count,
            limit: limit,
            order: order
        });
    })
    .catch(err => { response.send(err) })
    .finally(err => response.status(404))
})

router.get('/genre', (request, response) => {

    let page = parseInt(request.query.page);
    let limit = parseInt(request.query.limit);
    let order = request.query.order;

    page = page ? page : 1;
    limit = limit ? limit : 20;
    order = order ? order : "id_genre";
    
    Genre.findAndCountAll({
        limit: limit,
        offset: (page-1) * limit,
        order: [order]
    })
    .then(result => {
        count = result.count
        response.render('genre', {
            genres: result.rows,
            count: result.count,
            limit: limit,
            order: order
        });
    })
    .catch(err => { response.send(err) })
    .finally(err => response.status(404))
})

router.get('/login', (request, response) => {

    response.render('login', {
        user: request.current_user
    });

})

router.get('/register', (request, response) => {

    response.render('register');

})

module.exports = router
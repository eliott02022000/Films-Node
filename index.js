const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    homeRouter = require('./routes/home'),
    usersRouter = require('./routes/api/users');
    ejs = require('ejs');
    path = require('path');
    sgMail = require('@sendgrid/mail');
    nodemailer = require('nodemailer');

const { sequelize, User, Board } = require('./database');

const app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server);

app.set('view engine', 'ejs');

app.use((request, response, next) => {
    request.io = io;
    request.isFrench = () => {
        return (request.headers['accept-language'] && request.headers['accept-language'].includes('fr'))
    };
    next();
})

app.use(session({
    secret: 'aziheoaiheoanoadoaq azdak',
    cookie: {},
    resave: true,
    saveUninitialized: true
}));

app.use((request, response, next) => {

    if (request.session.user_id) {
        User.findByPk(request.session.user_id).then((user) => {
            if (!user.ban) {
                request.current_user = user
                next();
            } else {
                request.session.user_id = null
                response.render('errors/403')
            }
        });
    } else {
        next();
    }
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(homeRouter)
app.use(usersRouter)


app.get('/email', (req, res) => {

    async function main() {

        const gmailEmail = 'XXXX';
        const gmailPassword = 'XXXXXXXX';

        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          auth: {
            user: gmailEmail, 
            pass: gmailPassword, 
          },
        });
      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: gmailEmail, 
          to: "test@test.fr",
          subject: "Hello ✔", 
          text: "Hello world?",
          html: "<b>Hello world?</b>",
        });
      
        console.log("Message sent: %s", info.messageId);
      
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
      
      main().catch(console.error);
})
app.get('/404', (request, response) => {
    response.render('errors/404')
})

server.listen(3000);
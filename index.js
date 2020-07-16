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


// app.get('/email', (req, res) => {

//     async function main() {
//         // Generate test SMTP service account from ethereal.email
//         // Only needed if you don't have a real mail account for testing
      

//         const gmailEmail = 'XXXX';
//         const gmailPassword = 'XXXXXXXX';
//         // create reusable transporter object using the default SMTP transport
//         let transporter = nodemailer.createTransport({
//           host: "smtp.gmail.com",
//           auth: {
//             user: gmailEmail, // generated ethereal user
//             pass: gmailPassword, // generated ethereal password
//           },
//         });
      
//         // send mail with defined transport object
//         let info = await transporter.sendMail({
//           from: gmailEmail, // sender address
//           to: "eliott.jarmoune@outlook.com", // list of receivers
//           subject: "Hello ✔", // Subject line
//           text: "Hello world?", // plain text body
//           html: "<b>Hello world?</b>", // html body
//         });
      
//         console.log("Message sent: %s", info.messageId);
//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
//         // Preview only available when sending through an Ethereal account
//         console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//       }
      
//       main().catch(console.error);
// })
app.get('/404', (request, response) => {
    response.render('errors/404')
})

server.listen(3000);
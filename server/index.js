require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , nodemailer = require('nodemailer')
    , stripe = require('stripe')(process.env.REACT_APP_STRIPE_KEY)
    , ctrl = require('./controller')
    , axios = require('axios')
    , twilio = require('twilio');

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env

const app = express();

app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile email'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db')
    let { id, displayName, picture } = profile;
    let { email } = profile._json
    db.find_user([id]).then(user => {
        if (user[0]) {
            done(null, user[0].user_id)
        } else {
            db.create_user([displayName, picture, email, id]).then(createdUser => {
                done(null, createdUser[0].user_id)
            })
        }
    })
}))

passport.serializeUser((primaryKeyID, done) => {
    done(null, primaryKeyID);
})
passport.deserializeUser((primaryKeyID, done) => {
    app.get('db').find_session_user([primaryKeyID]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `${process.env.FRONTEND_URL}#/`
}))
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(`https://michaelrt17.auth0.com/v2/logout?returnTo=${process.env.FRONTEND_URL + '#/'}`)
})
app.get('/api/getProducts', ctrl.getProducts);
app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    }
})
app.post('/api/addToCart', ctrl.addToCart);
app.get('/api/getCartItems', ctrl.getCartItems);
app.get('/api/getMains', ctrl.getMains);
app.get('/api/getSides', ctrl.getSides);
app.get('/api/getDesserts', ctrl.getDesserts);
app.post('/api/updateAmount', ctrl.updateAmount);
app.delete('/api/removeProduct/:product_id', ctrl.removeProduct);
app.delete('/api/removeFromCart', ctrl.removeFromCart);
app.post('/api/createEvent', ctrl.createEvent);
app.post('/api/addToEventCart', ctrl.addToEventCart);
app.put('/api/linkToEvent/:id', ctrl.linkToEvent);
app.get('/api/getUserEvents/:user_id', ctrl.getUserEvents);
app.get('/api/getEvent/:user_id/:event_id', ctrl.getEvent);
app.post('/api/payment', (req, res) => {
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
        if (amountArray[i] === ".") {
            if (typeof amountArray[i + 1] === "string") {
                pennies.push(amountArray[i + 1]);
            } else {
                pennies.push("0");
            }
            if (typeof amountArray[i + 2] === "string") {
                pennies.push(amountArray[i + 2]);
            } else {
                pennies.push("0");
            }
            break;
        } else {
            pennies.push(amountArray[i])
        }
    }
    const convertedAmt = parseInt(pennies.join(''));

    const charge = stripe.charges.create({
        amount: convertedAmt,
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function (err, charge) {
        if (err) {
            console.log(err)
            return res.status(500).send();
        }
        else {

            return res.status(200).send();
        }
    });
});
app.put('/api/updatePaid/:event_id', ctrl.updatePaid);
app.delete('/api/deleteEvent/:event_id', ctrl.deleteEvent);
app.put('/api/updateEvent/:event_id', ctrl.updateEvent);

//nodemailer

app.post('/api/sendMail', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: req.body.subject,
        html: `${req.body.message} <br /> <br /> - from ${req.body.name} <br />  ${req.body.email}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
    res.status(200).send()
})

//twilio
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = new twilio(accountSid, authToken)

app.post('/sendText', (req, res) => {
    client.messages.create({
        body: 'A customer has placed an order.',
        to: process.env.PHONE_NUMBER,
        from: '+13854484210'
    }).then(message => console.log(message.sid))
        .done();
})

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Yo yo yo from port: ${SERVER_PORT}`)
    });
});

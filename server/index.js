require('dotenv').config();
const express = require('express')
    , massive = require('massive')
    // , bodyParser = require('body-parser')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , ctrl = require('./controller');

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
    // console.log(profile)
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
    app.get('db').find_session_user([primaryKeyID]).then( user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/'
}))
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/#/')
})
app.get('/api/getProducts', ctrl.getProducts);
app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    } 
})


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => {
        console.log(`Yo yo yo from port: ${SERVER_PORT}`)
    });
});

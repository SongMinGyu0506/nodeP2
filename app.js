/* module import start */
const express = require('express'); 
const {sequelize} = require('./models');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


/* router import */
const userRouter = require('./router/userRouter');
const memoRouter = require('./router/memoRouter');


const morgan = require('morgan');






/* express setting start */
const app = express();
app.use(bodyParser.json());
passportConfig();
app.set('port',process.env.PORT || 3000);

/* middle-ware and router setting */
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'process.env.COOKIE_SECRET',
    cookie:{
        httpOnly:true,
        secure: false,
    },
    name:'session-cookie',
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/user',userRouter);
app.use('/memo',memoRouter);


//Sequelize DB
sequelize.sync({force:false}).then(()=>{
    console.log("DB Connected");
}).catch((err)=>{
    console.error(err);
});

app.post('/',(req,res)=>{
    console.log(req.body.user);
    res.send(req.body.user);
})


/* Error Handler */
app.use((req,res,next)=> {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use ((err,req,res,next)=> {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.send(res.locals.message);
});


/* server start */
app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'listening');
});
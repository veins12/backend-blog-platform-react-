const express = require('express');
const app = express();
const hbs = require('hbs')
const path = require('path')
const loginCollection = require('./mongodb')
const blogRoutes = require('../routes/blog.route')
// const commentRoutes = require('../routes/comment.route')
const cookieParser = require('cookie-parser');
const { checkForAuthenticaitonCookie } = require('../middlewares/authenticaiton');

app.use(express.json())
app.use(express.urlencoded({extended:false}));
// app.use(cookieParser());
// app.use(checkForAuthenticaitonCookie("token"))


app.use('/',blogRoutes);



const tempelatePath = path.join(__dirname, '../Templates')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(tempelatePath, 'partials'); // Ensure this is correct



app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath);

console.log(tempelatePath)
console.log(partialsPath);


app.get('/',(req,res)=>{
    res.render('home')

})

// app.get('/signup', (req, res) => {
//     res.render('signup')
// })

app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/post',(req,res)=>{
    res.render('blog')
})





//Post method
// app.post('/signup', async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     try {
//         const check = await loginCollection.findOne({ name: req.body.name });

//         if (check) {
//             if (check.password === req.body.password) {
//                 res.send("user details already exist");
//             } else {
//                 res.send("wrong inputs");
//             }
//             return; // Exit the function after sending the response
//         } else {
//             await loginCollection.insertMany([data]);
//             res.status(201).render("home", { naming: req.body.name });
//         }
//     } catch (e) {
//         res.send("wrong inputs");
//     }
// });


// app.post('/login', async (req, res) => {
//     try {
//         const check = await loginCollection.findOne({ name: req.body.name });

//         if (check && check.password === req.body.password) {
//             res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
//         } else {
//             res.send("incorrect password");
//         }
//     } catch (e) {
//         res.send("wrong details");
//     }
// });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(3000,()=>{
    console.log('Server is connected...')
})



        
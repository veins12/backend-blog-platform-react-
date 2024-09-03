const express = require('express');
const router = express.Router(); // Initialize the router object
const { getBlogs, getBlog, createBlogs, updateBlogs, deleteBlog  } = require('../controller/blog.controller'); // Import the getBlogs function
const { getComment, createComment, checkComment, createComments } = require('../controller/comment.controller');
const { getSignup, createSignup, getLogin } = require('../controller/user');
const {getBlogsByCategory} = require('../controller/category.controller')
const {getprofile} = require('../controller/profile.controller')
//User 
router.get("/signup",getSignup);
router.post('/signup',createSignup);
router.post('/login',getLogin);



// Define the route
router.get('/blog', getBlogs); // Define the route to use getBlogs function
router.get('/blog/:id', getBlog); 
router.post('/blog', createBlogs); 
router.put('/blog/:id', updateBlogs); 
router.delete('/blog/:id', deleteBlog); 

//Comments section
router.get('/blog/comment/:id', getComment);
router.post('/blog/:id/comment', createComments)

//Category section
router.get('/blog/category/:category', getBlogsByCategory);


//profile section
router.get('/profile/:userFullname', getprofile);


module.exports = router; // Export the router

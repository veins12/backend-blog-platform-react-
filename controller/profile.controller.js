const {User, Blog} = require('../models/blog.model')


const getprofile = async(req, res) =>{

try{ 
    const userFullname = req.params.userFullname;
    const user = await User.findOne({ fullName: userFullname })
    .populate({
      path: 'blogs',
      select: 'title content author comments',
      populate: {
        path: 'comments',
        select: 'author content createdAt'
      }
    });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const blogs = await Blog.find({  author: userFullname }).populate({
        path: 'comments',
        select: 'author content ' // Fields to include from Comment
    });;
    
    res.status(200).json({
        fullName: user.fullName,
        profileImageURL: user.profileImageURL,
        blogs: blogs
      });;
      console.log(user)
      //console.log(blogs)
}
catch(err){
    return res.status(500).json({message:err.message})
}
};

module.exports ={
    getprofile
}

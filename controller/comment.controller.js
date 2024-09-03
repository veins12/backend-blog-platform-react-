const {Blog, Comment} = require("../models/blog.model");

const createComments= async (req, res) => {
    // try {
    // //   const blogId = req.params.id;
    // //   const {author, content} = req.body;

    // //   const newComment = new Comment ({
    // //     blog: blogId,
    // //     author, content
    // //   })

    // //   await newComment.save()

    // //   const blog = await Blog.findById(blogId)
    // //   console.log(blog)
    // //   blog.comments.push(newComment)
    // //   await blog.save();
      
    // //   res.status(200).json(newComment._id);
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
    try {
        const blogId = req.params.id;
        const { author, content } = req.body;
        
       
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }

        
        const newComment = new Comment({
            blog: blogId,
            author,
            content
        });

        
        await newComment.save();

       
        if (!Array.isArray(blog.comments)) {
            blog.comments = [];
        }

       
        blog.comments.push(newComment._id);
        await blog.save();

        res.status(201).send(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send({ message: error.message });
    }
  };

  // const getComment = async (req, res) => {
  //   try {
  //     const { blogId } = req.params;

  //     // Find the blog and populate comments
  //     const blog = await Blog.findById(blogId)
  //         .populate("comments");
  //     if (!blog) {
  //       return res.status(404).send({ message: 'Blog not found' });
  //     }
  //     // res.status("hello")
  //     res.status(200).json(blog);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };
  const getComment = async (req, res) => {
    try {
        const {id} = req.params;

        // Find the blog and populate comments
        const blog = await Blog.findById(id)
            .populate({
                path: 'comments',
                select: 'author content createdAt' // Fields to include from Comment
            });

        if (!blog) {
            return res.status(404).send({ message: 'Blog not found' });
        }
       
        res.status(200).json(blog.comments);
    } catch (error) {
        console.error('Error fetching blog with comments:', error);
        res.status(500).send({ message: error.message });
    }
};
  module.exports={
    createComments,
    getComment,
 
  }
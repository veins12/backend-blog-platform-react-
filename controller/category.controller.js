const {Blog} = require('../models/blog.model')
const getBlogsByCategory = async (req, res) => {
    try {
      const category = req.params.category;
      const blogs = await Blog.find({ category });//later make sure to use the filter method.
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports={
    getBlogsByCategory,
  }
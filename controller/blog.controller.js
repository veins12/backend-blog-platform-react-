const {Blog} = require("../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate({
      path: 'comments',
      select: 'author content ' // Fields to include from Comment
  });

  // console.log('Fetched blogs with comments:', blogs); // Logging the fetched blogs with comments

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate({
      path: 'comments',
      select: 'author content ' // Fields to include from Comment
  });;
    // res.status("hello")
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createBlogs = async (req, res) => {


  try{
    const { title, content, author, category } = req.body;
    //Validate the category
    const validCategories = ['Technology', 'Lifestyle', 'Education'];
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: "Invalid category" });
  }
 
  const blog = new Blog({
    title,
    content,
    author,
    category
  });

  await blog.save();
  res.status(200).json(blog);
}
 catch(error) {
  res.status(500).json({ message: error.message });
}
};

const updateBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndUpdate(id, req.body);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const updateBlogs = await Blog.findById(id);
    res.status(200).json(updateBlogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    const deleteBlog = await Blog.findById(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json("message: err.message");
  }
};

module.exports = {
  getBlogs,
  getBlog,
  createBlogs,
  updateBlogs,
  deleteBlog,
};

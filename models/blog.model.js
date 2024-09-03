const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("node:crypto");
const { createTokenForUser } = require("../services/auth");
const Schema = mongoose.Schema;
const commentSchema = mongoose.Schema(

  {
    blog: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      require: false,
    },
    author: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },

  },
  {
    timestamps: true,
  }
);
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    salt: {
      type: String,
      
    },
    password: {
      type: String,
      require: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/pp.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    blogs: [{
      type: Schema.Types.ObjectId,
      ref: 'Blog',
     
    }],
  },
  { timestamps: true }
);
const blogSchema = mongoose.Schema(

  {
    title: {
      type: String, //check later
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      // ref:'User',
      require: true,
    },
    // auth: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
    users:{
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
     comments:
    [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],

    category:{
      type: String,
      ref: 'Category',
      require:true,
      enum: ['Technology', 'Health', 'Lifestyle', 'Education'] 
      
    }

  },
  {
    timestamps: true,
  }
);




const categorySchema = mongoose.Schema({
  Blog:{
    type: Schema.Types.ObjectId,
    ref:'Blog',
    unique:true,
  },
  name: {
    type: String,
    require: true,
  },
  
},
{
  timestamps: true,
})

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString('hex');
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

    this.salt= salt;
    this.password = hashedPassword;

    next();
});

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
  const user = await this.findOne({email});
  if(!user) throw new Error('User not found');


  console.log(user);
  const salt= user.salt;
  const hashedPassword = user.password;


  //userprovided password hash gareko
  const userProvidedHash = createHmac("sha256", user.salt)
  .update(password)
  .digest("hex");

if (user.password !== userProvidedHash) throw new Error('Incorrect Password');

const token = createTokenForUser(user);
return token;

})


const User = mongoose.model("User", userSchema);
const Blog = mongoose.model("Blog", blogSchema);
const Comment = mongoose.model("Comment", commentSchema);
const Category = mongoose.model("Category", categorySchema);


module.exports = {
  User,
  Blog,
  Comment,
  Category
};

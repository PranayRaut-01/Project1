const jwt = require("jsonwebtoken");
const blogModel = require("../models/blogModel");
const  mongoose = require("mongoose");

///////////////// [ ALL AUTHENTICATION LOGIC HERE ] /////////////////
const authenticAuthor = function (req, res, next) {
  try {

   const token = req.headers["x-api-key"];
    if (!token) {
      return res.status(404).send({ status: false, msg: "Token must be present" });
    }

    jwt.verify(token, "Group35-Project1", function (error, decodedToken) { 
      if (error) {
        return res.status(401).send({ status: false, msg: "token invalid" });
      }
      req.authorId= decodedToken.authorId
      next();
    });

  } 
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


///////////////// [ ALL AUTHORISATION LOGIC HERE ] /////////////////
const authorizedAuthor = async function (req, res, next) {
  try {

    const bodyAuthorId = req.body.authorId
    if(bodyAuthorId){
      if (!mongoose.Types.ObjectId.isValid(bodyAuthorId)) {
        return res.status(400).send({ status: false, msg: "Provide valid authorId" });
      }

      const userLoggedIn = req.authorId;
      if (bodyAuthorId != userLoggedIn) {
        return res.status(403).send({status: false,msg: "You are not authorised for this request"});
      } 
      else {
       return next();
      }

    }

    const blogId = req.params.blogId;
    if (blogId) {
      if (!mongoose.Types.ObjectId.isValid(blogId)) {
        return res.status(400).send({ status: false, msg: "Provide valid blogId" });
      }

      const findBlog = await blogModel.findById(blogId);
      if (!findBlog)
      return res.status(404).send({ status: false, msg: "No blog with this Id" });

      const findAuthorId = findBlog.authorId;
      const userLoggedIn = req.authorId;
      if (findAuthorId != userLoggedIn) {
        return res.status(403).send({status: false,msg: "You are not authorised for this request"});
      } 
      else {
        return next();
      }
    }
    
    return res.status(400).send({status:false,msg:" blogId is required"})   

  } 
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

///////////////// [ EXPRORTED MIDDLEWARE ] /////////////////
module.exports.authenticAuthor = authenticAuthor;
module.exports.authorizedAuthor = authorizedAuthor;

const express = require('express');
const router = express.Router();


///////////////// [ IMPORTED CONTROLLERS ] /////////////////
const authorController= require("../controllers/authorController");
const blogController= require("../controllers/blogController");
const middleware= require("../Middleware/auth");


///////////////// [ ALL API's HERE ] /////////////////
router.post('/authors',authorController.createAuthor)

router.post('/blogs',middleware.authenticAuthor,middleware.authorizedAuthor,blogController.createBlog)

router.get('/blogs',middleware.authenticAuthor,blogController.getBlogs)

router.put('/blogs/:blogId',middleware.authenticAuthor,middleware.authorizedAuthor,blogController.updateBlog)

router.delete('/blogs/:blogId',middleware.authenticAuthor,middleware.authorizedAuthor,blogController.deleteBlog)

router.delete('/blogs',middleware.authenticAuthor,blogController.blogDeleteByQuery)

router.post('/login',authorController.loginAuthor)


///////////////// [ EXPRORTED ROUTHER ] /////////////////
module.exports = router;
const authorModel = require("../models/authorModel");
const validator = require("validator");
const jwt = require("jsonwebtoken")
///////////////// [ ALL HANDLER LOGIC HERE ] /////////////////


///////////////// [ CREATE AUTHOR HANDLER ] /////////////////
const createAuthor = async function (req, res) {
  try {

    const body = req.body;

    const fnameData = body.fname;
    if (!fnameData)
      return res.status(400).send({ status: false, msg: "Provide first name" });

    const lnameData = body.lname;
    if (!lnameData)
      return res.status(400).send({ status: false, msg: "Provide last name" });

    const passwordData = body.password;
    if (!passwordData)
      return res.status(400).send({ status: false, msg: "Provide password" });

    const emailData = body.email;
    if (!emailData)
      return res.status(400).send({ status: false, msg: "Provide email" });

    const validEmail = validator.isEmail(emailData);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Please enter valid email" })

    const checkEmail = await authorModel.findOne({ email: emailData });
    if (checkEmail)
      return res.status(400).send({ status: false, msg: "This email already exists" });

    const titleData = body.title;
    if (titleData) {
      if (titleData == "Mr" || titleData == "Mrs" || titleData == "Miss") {

        const authorCreation = await authorModel.create(body);
        return res.status(201).send({ status: true, data: authorCreation });
      }
      else
        return res.status(400).send({ status: false, msg: "Provide correct title" });
    }

      const authorCreation = await authorModel.create(body);
      return res.status(201).send({status:true, data: authorCreation})
    

  }
  catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};


///////////////// [ CREATE AUTHOR LOGIN HANDLER ] /////////////////
const loginAuthor = async function (req, res) {
  try{
    const email = req.body.email;
    const password = req.body.password;

    if (!password)
      return res.status(400).send({ status: false, msg: "Provide password" });

    if (!email)
      return res.status(400).send({ status: false, msg: "Provide email" });

    const validEmail = validator.isEmail(email);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Please enter valid email" })
  
    const author = await authorModel.findOne({ email: email, password: password });
    if (!author)
      return res.status(400).send({status: false, msg: "username or the password is not valid"  });

    const token = jwt.sign(
      {
        authorId: author._id.toString(),
        job:"Blogging",
        organisation: "FunctionUp",
      },
      "Group35-Project1"
    );

   return res.status(201).send({ status: true, data: token });
  }
  catch(err){
   res.status(500).send( {status :false,msg:err.message})
  }
  };

///////////////// [ EXPRORTED AUTHOR HANDLER ] /////////////////
module.exports.createAuthor = createAuthor;
module.exports.loginAuthor = loginAuthor;

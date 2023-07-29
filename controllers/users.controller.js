require("dotenv").config();
const bcrypt = require("bcrypt");
const knexConfig = require('../knexfile');
const knex = require('knex')(knexConfig.development);
const validator = require("validator");
const jwt = require("jsonwebtoken");
const registerUser = async function (req, res) {
  try {
    const inValidPayload = await payloadValidator(req.body);
    if (inValidPayload.errors.length) {
      return res.status(400).json(inValidPayload);
    } else {
      const alreadyExist = await knex.raw("SELECT * FROM users WHERE email = ?", [req.body.email]);

      if (alreadyExist.rows.length) {
        res.status(400).json("User Already Exists!");
      } else {
        const { name, email, password, phone, address, isAdmin } = req.body;

        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        await knex.raw("INSERT INTO users (name, email, password, phone, address, isAdmin) VALUES (?,?,?,?,?,?)", [name, email, hashedPassword, phone, address, isAdmin]);
        res.status(201).json({ message: "User registered successfully" });
      }
    }
  } catch (error) {
    console.log(`Registration Unssuccessful Due to Error: ${error}`);
  }
};

async function userLogin(req, res) {
  try {
    const inValidPayload = await payloadValidator(req.body);
    const validationErors = inValidPayload.errors.filter(ele => ele.field === "email" || ele.field === "password");
    if (validationErors.length) {
      return res.status(400).json();
    } else {
      const alreadyExist = await knex.raw("SELECT * FROM users WHERE email = ?", [req.body.email]);

      if (!alreadyExist.rows.length) {
        return res.status(400).json({
          statusCode: 400,
          message: "User Not Found. Please Register Yourself",
        });
      } else {
        const passwordMatch = await bcrypt.compare(
          req.body.password,
          alreadyExist.rows[0].password
        );
        if (passwordMatch) {
          let jwtToken;
          try {
            jwtToken = await jwt.sign(
              {
                userDetails: alreadyExist.rows[0],
                isAdmin: alreadyExist.rows[0].isadmin
              },
              process.env.SECRET_KEY
            );
          } catch (err) {
            console.error("Error while generating token: ", err);
            return res.status(500).json({
              statusCode: 500,
              message: "Internal Server Error",
            });
          }
          if (jwtToken) {
            const user = {
              email: alreadyExist.rows[0].email,
              id: alreadyExist.rows[0].id,
              jwtToken,
              issuedAt: new Date(),
            };
            return res.status(200).json({
              message: "Login Successful!",
              statusCode: 200,
              user,
            });
          }
        } else {
          return res.json({
            statusCode: 401,
            message: "Incorrect password",
          });
        }
      }
    }
  } catch (error) {
    console.error("Error while login: ", error);
  }
}

async function payloadValidator(payload) {
  const { name, email, password, phone, address, isAdmin } = payload;
  const errorMessage = {
    errors: [],
  };

  //Name Validator
  if (!name) {
    errorMessage.errors.push({
      field: "name",
      error: "Name Missing",
    });
  } else if (typeof name !== "string") {
    errorMessage.errors.push({
      field: "name",
      error: "User name should be a valid string",
    });
  }

  // Email Address Validator
  if (!email) {
    errorMessage.errors.push({
      field: "email",
      error: "Missing email address",
    });
  } else if (!validator.isEmail(email)) {
    errorMessage.errors.push({
      field: "email",
      error: "Valid Email Address Required",
    });
  }

  // Password Address Validator
  if (!password) {
    errorMessage.errors.push({
      field: "password",
      error: "Missing Password",
    });
  } else if (
    !validator.isAlphanumeric(password) ||
    password.length < 8 ||
    password.length > 30
  ) {
    errorMessage.errors.push({
      field: "password",
      error: "Inappropriate Password Length",
    });
  }

  // Address Validator
  if (typeof address !== "string") {
    errorMessage.errors.push({
      field: "address",
      error: "Inappropriate Address",
    });
  }

  if (isAdmin === undefined || isAdmin === null) {
    errorMessage.errors.push({
      field: "isAdmin",
      error: "isAdmin value is required",
    });
  } else if (
    payload.hasOwnProperty("isAdmin") &&
    typeof payload.isAdmin != "boolean"
  ) {
    errorMessage.errors.push({
      field: "isAdmin",
      error: "Must be true or false",
    });
  }
  return errorMessage;
}

module.exports = { registerUser, userLogin };

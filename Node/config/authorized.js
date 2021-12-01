const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Load User model
const User = require("../models/UserModel");
const Company = require("../models/CompanyModel");
const Role = require("../models/RoleModel");

const authorized = (req, res, next) => {
  const authorization = req.header("Authorization");

  try {
    if (authorization) {
      const token = authorization.split(" ")[1];
      const decoded = jwt.verify(token, global.secretOrKey);

      const conditions = {
        $and: [
          { _id: mongoose.Types.ObjectId(decoded.id) },
          { delete_flag: false },
        ],
      };

      try {
        User.findOne(conditions).exec(async (err, user) => {
          if (err) {
            res.status(401).json({
              status: false,
              payload: null,
              error_code: 1000,
              errors: err.message,
            });
          } else {
            if (user) {
              if (token !== user.token) {
                res.status(401).json({
                  status: false,
                  payload: null,
                  error_code: 1000,
                  errors: "Unauthorized",
                });
              } else {
                var conditions = [];
                conditions.push({ delete_flag: false });

                var companies = await Company.find({ $and: conditions }).sort({ name: 1 }).exec();
                var roles = await Role.find({ $and: conditions }).exec();

                req.user = user;
                req.companies = companies;
                req.roles = roles;

                next();
              }
            } else {
              res.status(401).json({
                status: false,
                payload: null,
                error_code: 1000,
                errors: "Unauthorized",
              });
            }
          }
        });
      } catch (err) {
        res.status(401).json({
          status: false,
          payload: null,
          error_code: 1000,
          errors: err.message,
        });
      }
    }
    else {
      res.status(401).json({
        status: false,
        payload: null,
        error_code: 1000,
        errors: err.message,
      });
    }
  } catch (err) {
    res.status(401).json({
      status: false,
      payload: null,
      error_code: 1000,
      errors: err.message,
    });
  }
};

module.exports = authorized;

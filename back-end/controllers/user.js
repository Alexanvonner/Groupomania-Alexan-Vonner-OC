// import
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();
// importation models de la bdd User.js
const models = require("../models/users");

// regex 
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



// ROUTES
exports.signup = (req, res, next) => {
    // Params 
    console.log(req.body)
    var email = req.body.email; 
    var password = req.body.password;
    var username = req.body.username;
    var bio = req.body.bio;

    // controle que tout les champs ne soit pas égale a NULL
    if (email == null || username == null || password == null ) {
      return res.status(400).json({'error' : 'missing parameters '})
    };

    // je controle la validité de l'email fourni par l'user
    if (!email_regex.test(email)) {
      return res.status(400).json({'error' : 'invalid e-mail'})
    }

    models.Users.findOne({
      where : {email : email},
    }).then(function(userFound){
      if (!userFound) {
        // salt combien de fois sera executer l'algo de hashage
      bcrypt.hash(password, 10)
      .then(hash => {
        const user = new models.Users.create({
            email: email,
            password: hash,
            username : username ,
            bio : bio,
            isAdmin : 0,
        })
          .then(function(user){
            return res.status(201).json({
              'userId' : userFound.id
            })
          })
          .catch(function(err){
            return res.status(500).json({'error' : 'cannot add user'});
          });
      });
      } else {
        return res.status(409).json({'error': 'user already exist'});
      }
    }).catch(function(error){
      return res.status(500).json({'error' : 'unable to verify user'});
    });
};
    

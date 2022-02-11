// import
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

// regex 
const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// importation models de la bdd User.js
const models = require("../models/users");



// ROUTES
exports.signup = (req, res, next) => {
    // Params 

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;

    // controle que tout les champs ne soit pas égale a NULL
    if (email == null || username == null || password == null ) {
      return res.status(400).json({'error' : 'missing parameters '})
    };

    // je controle la validité de l'email fourni par l'user
    if (!email_regex.test(email)) {
      return res.status(400).json({'error' : 'INVALID EMAIL'})
    }

    models.User.findOne({
      attributes : '[email]',
      where : {email : email},
    }).then(function(userFound){
      if (!userFound) {
        
      } else {
        return res.status(409).json({'error': 'user already exist'});
      }
    }).catch(function(error){
      return res.status(500).json({'error' : 'unable to verify user'});
    });
   
    
    // salt combien de fois sera executer l'algo de hashage
      bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };
    
    


    //login pour s'authentifer
    exports.login = (req,res,next) => {

    // chercher dans la bdd si l'user est bien present
      User.findOne({ email: req.body.email })
        .then(user => {
          if (!user) {
              console.log("log de user");
              console.log(user);
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          bcrypt.compare(req.body.password, user.password)
            .then(valid => {
              if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
              }
              res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    // 3 arguments
                    {userId :  user._id},
                    `${process.env.TOKEN}`,
                    {expiresIn : '12h'}
                )
              });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };

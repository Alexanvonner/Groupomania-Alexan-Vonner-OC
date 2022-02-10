// importation de bcrypt
const bcrypt = require("bcrypt");



const jwt = require('jsonwebtoken');


const dotenv = require('dotenv');
require('dotenv').config();



// importation models de la bdd User.js
const User = require("../models/users");

exports.signup = (req, res, next) => {
    // Params 

    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;

    if (email == null || username == null || password == null ) {
      return res.status(400).json({'error' : 'missing parameters '})
    };
   
    
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

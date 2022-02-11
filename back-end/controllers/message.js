const Message =  require('../models/messages');



exports.createMessage = (req, res, next) => {
  const messageObject = JSON.parse(req.body.message);
  delete messageObject._id;
  const message = new Message({
    ...messageObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    userlikes:[],
    userdisliked:[]
  });
  Message.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => {res.status(400).json({ error });})      
};



exports.getMessage = (req, res, next) => {
  Message.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
};


exports.getOneMessage = (req, res, next) => {
  Message.findOne({ _id: req.params.id })
    .then(sauces => {     
      console.log(sauces)
      res.status(200).json(sauces)}
      )
    .catch(error => res.status(404).json({ error }));
};


exports.updateMessage = (req, res, next) => {  
  const messageObject = req.file ?
  {
    ...JSON.parse(req.body.sauces),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Message.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteMessage = (req, res, next) => {
  Message.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};
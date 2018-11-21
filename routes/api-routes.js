const User = require('../models/User');
const Kudos = require('../models/Kudos');

module.exports = function (app) {


  app.get('/api/user', function (req, res) {
    User.find({})
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  });

  app.get('/api/kudo', function (req, res) {
    Kudos.find({})
    .populate('User')
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.json(err);
    });
  });


  app.post('/api/user', function (req, res) {
    User.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      });
  });


  app.post('/api/kudo', function (req, res) {
    const newEntry = {
      title: req.body.title,
      body: req.body.body,
      to: req.body.to,
      from: req.body.from
    }
    Kudos.create(newEntry)
      .then(function (newKudos) {
        return Kudos.updateOne({_id: newEntry._id},{ $push: { to: newEntry.to, from: newEntry.from} }, { new: true });
    })
    .then(function(userData) {
      res.json(userData);
    })
    .catch(function (err) {
      res.json(err);
    });
  });
}
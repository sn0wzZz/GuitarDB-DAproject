var Guitardb = require("../model/model")

//create and save new guitar
exports.create = (req, res) => {
  //validate req
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" })
    return
  }

  //new guitar
  const guitar = new Guitardb({
    guitar: req.body.guitar,
    brand: req.body.brand,
    radius: req.body.radius,
    price: req.body.price,
    isAwesome: req.body.isAwesome,
    year: req.body.year,
  })

  //save guitar in db
  guitar
    .save(guitar)
    .then((data) => {
      // res.send(data)
      res.redirect('/add-guitar')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occured while creating a guitar",
      })
    })
}

//retrive and return all users/ user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id

    Guitardb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found guitar with id=" + id })
        } else {
          res.send(data)
        }
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "Error retrieving guitar with id" + id })
      })
  } else {
    Guitardb.find()
      .then((guitar) => {
        res.send(guitar)
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message: err.message || "Error occured while fetching a guitar",
          })
      })
  }
}

//update a new identidied guitar by guitar id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Database can not be empty" })
  }

  const id = req.params.id
  Guitardb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update guitar with ${id}. May not exist...`,
          })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error occured while updating guitar information" })
    })
}

//delete a user with specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Guitardb.findByIdAndDelete(id).then((data) => {
    if (!data) {
      res
        .status(404)
        .send({ message: `Cannot delete guitar with id ${id}. Id my be wrong` })
    } else {
      res
        .send({
          message: "Guitar was deleted sucessfully!",
        })
        // .catch(err => {
        //   res.status(500).send({
        //     message: "Could not delete guitar with id=" + id,
        //   })
        // })
    }
  })
}



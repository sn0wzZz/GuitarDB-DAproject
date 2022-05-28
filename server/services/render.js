const axios = require("axios")

exports.homeRoutes = (req, res) => {
  //Make a get request to /api/guitars
  axios
    .get("http://localhost:3000/api/guitars")
    .then(function (response) {
      res.render("index", { guitars: response.data })
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.addGuitar = (req, res) => {
  res.render("add_guitar")
}

exports.updateGuitar = (req, res) => {
  axios.get("http://localhost:3000/api/guitars", {params:{id:req.query.id}})
  .then(function(guitardata){
    res.render("update_guitar",{guitar:guitardata.data})
  })
  .catch(err=>{
    res.send(err)
  })
}

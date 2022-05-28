const mongoose = require("mongoose")
const { isDecimal } = require('validator')
let opts = { runValidators: true }

// let date = new Date(dateStr)

// let d= date.getDate()
// let m= date.getMonth()
// let y= date.geYear()

function formatDate(date) {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [year, month, day].join("-")
}

let schema = new mongoose.Schema({
  guitar: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  radius: {
    type: mongoose.Decimal128,
    min: [7.5, 'Not available'],
    max: 20.0,
    required: true,
    // validate: [isDecimal, 'Value is not a decimal']
  },
  price: {
    type: Number,
    min: [0, "Not a valid price"],
    max: 999999,
    // required: true,
  },
  isAwesome: {
    type: Boolean,
  },
  year: {
    type: String,
    required: true,
    set: (date) => formatDate(date),
  },
})


const Guitardb = mongoose.model("guitardb", schema)
module.exports = Guitardb

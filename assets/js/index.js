$("#add_guitar").submit(function (event) {
  alert("Data inserted sucessfully!")
})

$("#update_guitar").submit(function (event) {
  event.preventDefault()

  let unindexed_array = $(this).serializeArray()
  let data = {}

  $.map(unindexed_array, function (n, i) {
    data[n["name"]] = n["value"]
  })

  console.log(data)

  let request = {
    url: `http://localhost:3000/api/guitars/${data.id}`,
    method: "PUT",
    data: data,
  }

  $.ajax(request).done(function (response) {
    alert("Data updated sucessfully!")
  })
})

if (window.location.pathname == "/") {
  $ondelete = $("table tbody td a.delete")
  $ondelete.click(function () {
    let id = $(this).attr("data-id")

    let request = {
      url: `http://localhost:3000/api/guitars/${id}`,
      method: "DELETE"
    }

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function (response) {
        location.reload()
      })
    }
  })
}

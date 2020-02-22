
$("#add-btn").on("click", function (event) {
    event.preventDefault();

    var reservation = {
        name: $("#name").val().trim(),
        phone: $("#phone").val().trim(),
        email: $("#email").val().trim(),
        uniqueID: $("#uniqueID").val().trim()
    };

    $.post("/api/tables", reservation)
        .then(function (data) {
            console.log(data);
            alert(data.response);
        });
});
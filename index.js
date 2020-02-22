const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

app.get("/api/tables", function(req, res) {
    return res.json(savedCustomers.tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(savedCustomers.waitList);
});

app.get("/api/all-reservations", function(req, res) {
    return res.json(savedCustomers);
});

app.post("/api/tables", function(req, res) {
    let newReservation = req.body;

    let currentTable = savedCustomers.tables.length;
    let currentWaitlist = savedCustomers.waitList.length;
    if (currentTable < 5) {
        savedCustomers.tables.push(newReservation);
        res.json({response: `Thank you for making a reservation. You have been assinged to table ${currentTable + 1}`});
    } else {
        savedCustomers.waitList.push(newReservation);
        res.json({response: `Tables are currently full. You have been added to the waitlist. There are currently ${currentWaitlist} tables ahead of you`});
    }
})

app.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
})

const savedCustomers = {
    tables: [],
    waitList: []
};

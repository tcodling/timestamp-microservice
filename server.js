
const express = require("express");
const app = express();

// Error handler
app.use(function (err, req, res, next) {
    if (err) {
        res
            .status(err.status || 500)
            .type("txt")
            .send(err.message || "SERVER ERROR");
    }
});

// Unmatched routes handler
app.use(function (req, res) {
    if (req.method.toLowerCase() === "options") {
        res.end();
    } else {
        res.status(404).type("txt").send("Not Found");
    }
});


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
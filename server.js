
const express = require("express");
const app = express();

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ['Jan','Feb','Marh','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];



app.get("/api/:date", (req, res) => {
    let date = new Date(req.params.date)
    if (!date.getTime()) {
        date = new Date(parseInt(req.params.date))
    }
    let unixTime = date.getTime()
    let utcTime = `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${"00"}:${"00"}:${"00"} GMT`
    res.json({
        unix: unixTime,
        utc: utcTime
    })
})


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

const express = require("express");
const app = express();

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function generateTimeObject(date) {
    console.log(date)
    let unixTime = date.getTime()
    let utcTime = `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${date.getUTCHours() || "00"}:${date.getUTCMinutes() || "00"}:${date.getUTCSeconds() || "00"} GMT`
    return {
        unix: unixTime,
        utc: utcTime
    }
}

app.get("/api", (req, res) => {
    let date = new Date(Date.now())
    res.json(generateTimeObject(date))
})

app.get("/api/:date", (req, res) => {
    let date = new Date(req.params.date)
    if (!date.getTime()) {
        date = new Date(parseInt(req.params.date))
        if (!date.getTime()) {
            res.json({
                error: "Invalid Date"
            })
        }
    }
    res.json(generateTimeObject(date))
})


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
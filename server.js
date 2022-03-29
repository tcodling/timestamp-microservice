const express = require("express");
const app = express();

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

if (!process.env.DISABLE_XORIGIN) {
    app.use(function(req, res, next) {
      var allowedOrigins = ['https://narrow-plane.gomix.me', 'https://www.freecodecamp.com'];
      var origin = req.headers.origin || '*';
      if(!process.env.XORIG_RESTRICT || allowedOrigins.indexOf(origin) > -1){
           console.log(origin);
           res.setHeader('Access-Control-Allow-Origin', origin);
           res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      }
      next();
    });
  }

function generateTimeObject(date) {
    // console.log(date)
    let unixTime = date.getTime()
    let utcTime = `${days[date.getUTCDay()]}, ${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} ${date.getUTCHours() || "00"}:${date.getUTCMinutes() || "00"}:${date.getUTCSeconds() || "00"} GMT`
    console.log({
        unix: unixTime,
        utc: utcTime
    })
    return {
        unix: unixTime,
        utc: utcTime
    }
}

app.get("/api", (req, res) => {
    console.log("NEW REQUEST /api ==================")
    let date = new Date(Date.now())
    // console.log(date)
    res.json(generateTimeObject(date))
})

app.get("/api/:date", (req, res) => {
    console.log("NEW REQUEST /api/" + req.params.date)
    let date = new Date(req.params.date)
    let err
    if (!date.getTime()) {
        date = new Date(Number(req.params.date))
        if (!date.getTime()) {
            err = true
          console.log("ERROR")
            res.json({
                error: "Invalid Date"
            })
        }
    }
    
    if (!err) {
        console.log("VALID")
        res.json(generateTimeObject(date))
    }
})


const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
const express = require("express");
const app = express();

function bananaMe(date, days) {
  // check for correct data
  if (isNaN(days)) {
    return {
      error: "Number of days required"
    };
  }
  else if (!date.match(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/)) {
    return {
      error: "Date must be in MM/DD/YYYY format"
    };
  }

  // establish start date
  var d = new Date(date);
  var cost = 0;

  // do math for every requested day
  for (let i = 0; i < days; i++) {
    // ignore weekends
    if (d.getDay() > 0 && d.getDay() < 6) {
      // divide by 7 to increment cost every 7th day of month
      cost += (Math.ceil(d.getDate()/7)*.05);
    }

    // add a day
    d.setDate(d.getDate() + 1);
  }

  return {
    cost: cost.toFixed(2)
  };
}

app.get("/", function(req, res) {
  res.send("Test API on /api/banana?startDate=&numberOfDays=");
});

app.get("/api/banana", function(req, res) {
  // send query parameters into banana algorithm
  var data = bananaMe(req.query.startDate, req.query.numberOfDays);
  res.json(data);
});

// start server
app.listen(process.env.PORT || 3000, function() {
  console.log("app started...");
});
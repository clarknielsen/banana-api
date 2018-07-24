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

  // establish today
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

console.log(bananaMe("7/31/2018", 2));
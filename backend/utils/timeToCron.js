function timeToCron(dateStr, timeStr) {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
  
    return `${minute} ${hour} ${day} ${month} *`;
  }
  
  module.exports = timeToCron;
  
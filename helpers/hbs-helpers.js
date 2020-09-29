const hbs = require("hbs")

hbs.registerHelper("isSameId", function (value1, value2, options) {
    if (value2.toString().includes(value1.toString())) {
        // console.log("value 1:", value1, "value2:", value2);
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
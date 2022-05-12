const connection = require("./connection");

class dbQueryUtil {
  constructor(connection) {
    this.connection = connection;
  }

}

module.exports = new dbQueryUtil(connection);
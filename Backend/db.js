const {Client} = require("pg");

let DB_URI;

if ( process.env.NODE_ENV === "test" ) {
  DB_URI = "postgresql:///itranslatedb_test";
} else {
  DB_URI = "postgres://xekuremvkzulik:6b8622ec721d9971708eb25b0630a7ef05bb07c46b41e1caa2522ef673a8f97e@ec2-34-200-106-49.compute-1.amazonaws.com:5432/d344hlhldv28n1";
  // DB_URI = "postgresql:///itranslatedb";
};

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;
import MySQLStore from "express-mysql-session";

const options: MySQLStore.Options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "wand",
};

export default options;

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("Server Running on 3001 PORT");
});

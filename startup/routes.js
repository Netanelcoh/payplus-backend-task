const express = require("express");
const auth = require("../api/auth");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
};

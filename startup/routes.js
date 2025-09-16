const express = require("express");
const auth = require("../api/auth");
const customer = require("../api/customer");
const user = require("../api/user");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/customer", customer);
  app.use("/api/user", user);
};

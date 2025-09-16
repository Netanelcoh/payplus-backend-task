const Joi = require("joi");
const bcrypt = require("bcrypt");
const { createUser, generateAuthToken } = require("../data-access/auth");
const prisma = require("../startup/db");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await prisma.user.findUnique({
    where: { israeli_id: req.body.israeli_id },
  });
  if (user) return res.status(400).send("User already registered.");

  user = req.body;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const newUser = await createUser(user);
  const token = generateAuthToken(newUser);
  res.send(token);
});

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await prisma.user.findUnique({
    where: { israeli_id: req.body.israeli_id },
  });
  if (!user) return res.status(400).send("Invalid id or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid id or password.");

  const token = user.generateAuthToken();
  res.send(token);
});

function validate(data) {
  const schema = Joi.object({
    israeli_id: Joi.string().length(9).pattern(/^\d+$/).required(),
    email: Joi.string().min(5).max(255).required().email(),
    full_name: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
}

module.exports = router;

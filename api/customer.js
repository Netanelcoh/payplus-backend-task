const Joi = require("joi");
const prisma = require("../startup/db");
const { createCustomer } = require("../data-access/customer");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.post("/add", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { id: userId } = req.user;
  const customer = req.body;

  const newCustomer = await createCustomer(customer, userId);
  res.send(newCustomer);
});

function validate(data) {
  const schema = Joi.object({
    id: Joi.string().length(9).pattern(/^\d+$/).required(),
    email: Joi.string().min(5).max(255).required().email(),
    name: Joi.string().min(5).max(255).required(),
    phone: Joi.string().min(5).required(),
  });

  return schema.validate(data);
}

module.exports = router;

const Joi = require("joi");
const prisma = require("../startup/db");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {});

router.get("/customers", auth, async (req, res) => {
  const { id: userId } = req.user;

  const customers = await prisma.customer.findMany({
    where: { userId: userId },
  });

  res.status(200).send(customers);
});

router.get("/customer/:id", async (req, res) => {
  const { id: userId } = req.user;
  const customerId = req.params.id;

  const customers = await prisma.customer.findMany({
    where: { userId: userId, id: customerId },
  });

  res.status(200).send(customers);
});

module.exports = router;

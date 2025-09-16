const Joi = require("joi");
const prisma = require("../startup/db");

async function createCustomer(customerData, userId) {
  const newCustomer = await prisma.customer.create({
    data: {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone,
      user: {
        connect: { id: userId },
      },
    },
  });

  return newCustomer;
}

module.exports.createCustomer = createCustomer;

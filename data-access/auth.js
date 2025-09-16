const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const prisma = require("../startup/db");

async function createUser(userData) {
  try {
    const newUser = await prisma.user.create({
      data: {
        israeli_id: userData.israeli_id,
        full_name: userData.full_name,
        email: userData.email,
        password: userData.password,
      },
    });

    return newUser;
  } catch (e) {
    console.error("Error creating user:", e);
    await prisma.$disconnect();
  }
}

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.full_name,
    },
    config.get("jwtPrivateKey")
  );
  return token;
}


exports.createUser = createUser;
exports.generateAuthToken = generateAuthToken;

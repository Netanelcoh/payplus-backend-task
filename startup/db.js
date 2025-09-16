const config = require("config");
const { PrismaClient } = require("../data-access/generated/prisma");

const databaseUrl = config.get("database_url");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});

module.exports = prisma;

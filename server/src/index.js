const express = require("express");
const bodyParser = require("body-parser");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const PORT = 3001;
const { ApolloServer } = require("@apollo/server");
const typeDefs = require("./schema");
const { resolvers } = require("./resolvers");

async function startServer() {
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers: resolvers });

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
  });
}

startServer();

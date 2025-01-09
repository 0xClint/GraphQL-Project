import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";

const PORT = Number(process.env.PORT) || 8000;

interface MyContext {
  token?: string;
}
const typeDefs = `
  type Query {
    hello: String
    say(name: String): String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, world!",
    say: (_: any, { name }: { name: String }) => `Hey ${name}, How are you!`,
  },
};

async function startServer() {
  const app = express();

  //Create gql server
  const gqlserver = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  //Start gql server
  await gqlserver.start();

  app.use(express.json());
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(gqlserver, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
  });

  app.listen(PORT, () => console.log(`Running server on PORT:${PORT}`));
}

startServer();

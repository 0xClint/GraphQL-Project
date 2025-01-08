import axios from "axios";

export const resolvers = {
  Todo: {
    user: async (todo) => {
      console.log(todo);
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${todo.userId}`
      );
      return res.data;
    },
  },
  Query: {
    getTodos: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");

      return res.data;
    },

    getAllUsers: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      return res.data;
    },
    getUser: async (parent, { id }) => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );
      return res.data;
    },
  },
};

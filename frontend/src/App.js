import logo from "./logo.svg";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

const getTodos = gql`
  query Query {
    getTodos {
      title
      id
      user {
        name
        id
        address {
          geo {
            lat
            lng
          }
          city
          street
          suite
          zipcode
        }
      }
      completed
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(getTodos);
  console.log(data);
  if (loading) return <h2>LOADING...</h2>;
  if (error) return <h2>ERROR...</h2>;
  return (
    <div className="App">
      <ul>
        {data?.getTodos.map(({ completed, id, title }) => (
          <li key={id}>
            <h3>{title}</h3>
            <p>id: {id}</p>
            <div>
              Completed : <input type="checkbox" readOnly value={completed} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

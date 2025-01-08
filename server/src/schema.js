const typeDefs = `

            type Geo {
                lat: String
                lng: String
            }

            type Address {
                street: String
                suite: String
                city: String
                zipcode: String
                geo: Geo
            }

            type User {
                id: ID!
                name: String!
                email: String!
                phone: String!
                website: String!
                address: Address!
            }
                
            type Todo {
                id: ID!
                title: String!
                completed: Boolean
                user: User
            }

            type Query {
                getTodos:[Todo]
                getAllUsers:[User]
                getUser(id: ID!): User
            }
            `;

module.exports = typeDefs;

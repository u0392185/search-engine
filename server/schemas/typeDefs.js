const { gql } = require('apollo-server-express')

// const typeDefs = gql`
//     type Auth {
//         token: ID!
//         user: User
//     }
//     type User {
//         _id: ID
//         username: String
//         email: String
//         bookCount: Int
//         savedBooks: [Book]
//     }

//     input BookInput {
//         authors: [String]
//         description: String
//         title: String
//         bookId: ID
//         image: String
//         link: String
//     }

//     type Book {
//         bookId: ID!
//         authors: [String]
//         description: String
//         title: String
//         image: String
//         link: String
//     }

//     type Query {
//         me: User
//         books: [Book]
//     }
// type Mutation {
//     // login(email: String!, password: String): Auth
//     addUser(username: String!, email: String!, password: String!): Auth
//     // saveBook(id: ID!, input: BookInput): User
//     // removeBook(id: ID, bookId: ID): User
// }

// `

const typeDefs = gql`
    type Query {
        me: User
        books: [Book]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        login(email: String!, password: String): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(username: String, input: BookInput): User
    }
    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        _id: ID
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }
    input BookInput {
        authors: [String]
        description: String
        title: String
        bookId: ID
        image: String
        link: String
    }
`;

module.exports = typeDefs

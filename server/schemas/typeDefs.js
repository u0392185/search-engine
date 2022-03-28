const { gql } = require('apollo-server-express')

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
        removeBook(username: String!, bookId: String!): User
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

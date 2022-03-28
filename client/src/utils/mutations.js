import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($username: String!, $input: BookInput!){
      saveBook(username: $username, input: $input ) {
          _id
          username
      }
  }
`
export const REMOVE_BOOK = gql`
  mutation removeBook($id: String!, $bookId: ID!){
      removeBook(id: $id, bookId: $bookId)
  }
`
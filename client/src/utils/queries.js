import { gql } from '@apollo/client';

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                _id
                authors
                description
                title
                image
                link
                bookId
            }
        }
    }
`
// Does the authors need to be an array here?



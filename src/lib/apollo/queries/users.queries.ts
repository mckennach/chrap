import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      bio
      birthday
      created_at
      username
      avatar
    }
  }
`

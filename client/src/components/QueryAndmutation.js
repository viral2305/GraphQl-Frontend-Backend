import gql from "graphql-tag";

export const GET_ALL_USER = gql`
  {
    users {
      id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_USER = gql`
mutation Mutation($removeUser: delete!) {
  deleteUser(removeUser: $removeUser) {
      id
      firstName
      lastName
      email
  }
}`;

export const GET_USER = gql`
 query Query($userId: ID!) {
  user(id: $userId) {
    id
    firstName
    lastName
    email
  }
}
`;

export const CREATE_USER = gql`
    mutation createUser($userNew: UserInput!){ 
        createUser(userNew: $userNew){
            id
            firstName
            lastName
            email
        }
    }`;

export const CHECK_ADMIN = gql`
mutation CheckAdmin($newAdmin: AdminInput!) {
    checkAdmin(newAdmin: $newAdmin) {
        id
        email
        password
        token
    }
}`;


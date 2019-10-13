import { buildSchema } from 'graphql';

export const userSchema = buildSchema(`

type Token {
   value: String
}

type User {
   id: ID!,
   username: String,
   password: String,
   tokenSecret: String
}

type Query {
   testFind(field: String, value: String): User,
   testUpdate(userId: String, field: String, value: String): User,
   testDelete(userId: String): User
}

type Mutation {
   create(username: String, password: String): User,
   login(username : String, password: String): Token
}
`);
import { buildSchema } from 'graphql';

export const userSchema = buildSchema(`
input UserInput {
   username: String,
   password: String,
}

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
   create(user: UserInput): User,
   login(username : String, password: String): Token
}
`);
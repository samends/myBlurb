import { config } from 'dotenv';
import { UserService } from './api/user.service';
import container from './inversify.config';
import TYPES from './types';
import 'reflect-metadata';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { sign, decode } from 'jsonwebtoken';
import { HashService } from './services/hash.service';
import { sampleMiddleware } from './middleware';
import * as moment from 'moment';
import { userSchema } from './schemas';

config();
const userService = container.resolve<UserService>(UserService);
const hashService = container.resolve<HashService>(HashService);

const root = {
	hello: () => 'Hello world!',
	create: async (user) => {
		try {
			return await userService.create(user);
		} catch (error) {
			console.log('There was an error', error);
		}
	},
	login: async ({ username, password }) => {
		try {
			let user = await userService.find({ username });
			if (hashService.compare(password, user.password)) {
				const tokenSecret = Math.floor(
					Math.pow(10, Number(process.env.JSON_TOKEN_SECRET_NUMBER_LENGTH)) *
						Math.random()
				);
				user = await userService.update(user.id, { tokenSecret: tokenSecret.toString() });
				const token = sign(
					{
						iss: user.id,
						expires: moment(new Date())
							.add(5, 'days')
							.unix()
					},
					`secret${user.tokenSecret}`
				);
				return { Authorization: token };
			} else {
				return Error('Wrong username or password');
			}
		} catch (error) {
			console.log('There was an error', error);
		}
	},
	testFind: async ({ field, value }) => {
		try {
			return await userService.find({ [field]: value });
		} catch (error) {
			console.log('There was an error', error);
		}
	},
	testUpdate: async ({ userId, field, value }) => {
		try {
			return await userService.update(userId, { [field]: value });
		} catch (error) {
			console.log('There was an error', error);
		}
	},
	testDelete: async ({ userId }) => {
		try {
			return await userService.delete(userId);
		} catch (error) {
			console.log('There was an error', error);
		}
	}
};

const app = express();
app.use(sampleMiddleware);
app.use(
	'/data',
	graphqlHTTP({
		schema: userSchema,
		rootValue: root,
		graphiql: true
	})
);

app.listen(4000);
console.log('GraphQL api server running at localhost:4000');

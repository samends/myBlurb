import 'reflect-metadata';
import { Users } from '../entity';
import { UserModel } from '../models/user';
import { injectable, inject } from 'inversify';
import TYPES from '../types';
import { TypeOrmWrapper } from './typeorm.wrapper';
import 'reflect-metadata';

@injectable()
export class ConnectionService {
	constructor(@inject(TYPES.TypeOrmWrapper) private typeOrmWrapper: TypeOrmWrapper) {
		try {
			this.typeOrmWrapper.createConnection({
				type: 'postgres',
				host: process.env.PGHOST,
				port: Number(process.env.PGPORT),
				username: process.env.PGUSER,
				password: process.env.PGPASSWORD,
				database: process.env.PGDATABASE,
				entities: [Users],
				synchronize: true,
				logging: false
			});
		} catch (error) {
			console.error('There was an error with connection', error);
		}
	}

	async findUser(queryObject: { [key: string]: string }): Promise<Users[]> {
		return await this.typeOrmWrapper.getRepository(Users).find(queryObject);
	}

	async createUser(user: UserModel): Promise<Users[]> {
		await this.typeOrmWrapper.getManager().save(user);
		return await this.typeOrmWrapper.getRepository(Users).find({ username: user.username });
	}

	async updateUser(id: string, fieldUpdate: { [field: string]: string }): Promise<Users[]> {
		await this.typeOrmWrapper
			.getRepository(Users)
			.createQueryBuilder()
			.update(Users)
			.set(fieldUpdate)
			.where('id = :id', { id })
			.execute();

		return await this.typeOrmWrapper.getRepository(Users).find({ id });
	}

	async deleteUser(id: string): Promise<Users[]> {
		const deletedUser = await this.typeOrmWrapper.getRepository(Users).find({ id });
		await this.typeOrmWrapper
			.getRepository(Users)
			.createQueryBuilder()
			.delete()
			.from(Users)
			.where('id = :id', { id })
			.execute();

		return deletedUser;
	}
}

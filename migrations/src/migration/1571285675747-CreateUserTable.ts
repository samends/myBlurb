import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import * as uuid from 'uuid';

export class CreateUserTable1571285675747 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true
					},
					{
						name: 'username',
						type: 'varchar'
					},
					{
						name: 'password',
						type: 'varchar'
					},
					{
						name: 'tokenSecret',
						type: 'varchar',
						isNullable: true
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable('users');
	}
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateHabitTable1581903636440 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.createTable(
			new Table({
				name: 'blurbs',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true
					},
					{
						name: 'createdAt',
						type: 'date'
					},
					{
						name: 'content',
						type: 'varchar'
					}
				]
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.dropTable('blurbs');
	}
}

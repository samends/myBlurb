import { MigrationInterface, QueryRunner } from 'typeorm';
import * as uuid from 'uuid';

export class AddStarterBlurb1581903985326 implements MigrationInterface {
	public starterBlurbId = uuid();

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.connection
			.createQueryBuilder()
			.insert()
			.into('blurbs')
			.values({
				id: this.starterBlurbId,
				createdAt: new Date(),
				content: 'Blurbing what I want, when I want to'
			})
			.execute();
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		queryRunner.connection
			.createQueryBuilder()
			.delete()
			.from('blurbs')
			.where({ id: this.starterBlurbId })
			.execute();
	}
}

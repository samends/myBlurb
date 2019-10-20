import {MigrationInterface, QueryRunner} from "typeorm";
import * as uuid from 'uuid';
import {genSalt, hash} from 'bcrypt';
import { INITIAL_ADMIN_PASSWORD } from '../constants';

export class CreateAdminUser1571591959785 implements MigrationInterface {
    public async genHash(password: string) {
        const hashedPassword = await new Promise((resolve, reject) => {
            genSalt(Number(process.env.SALT_ROUNDS), (err, salt) => {
                hash(password, salt, (e, generatedHash) => {
                    if (e) { return reject(e); }
                    resolve(generatedHash);
               });
            });
        });
        return hashedPassword as string;
    }

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.connection.createQueryBuilder()
        .insert()
        .into('users')
        .values({
            id: uuid(),
            username: 'admin',
            password: await this.genHash(INITIAL_ADMIN_PASSWORD),
        })
        .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        queryRunner.connection.createQueryBuilder()
            .delete()
            .from('users')
            .where({ username: 'admin'})
            .execute();
    }

}

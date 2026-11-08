import { MigrationInterface, QueryRunner } from "typeorm";

export class Sync1750552723853 implements MigrationInterface {
    name = 'Sync1750552723853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "fullName" nvarchar(255), "registrationNumber" nvarchar(255), "departmentName" nvarchar(255), "gender" nvarchar(255), "phoneNumber" nvarchar(255), "routeNumber" nvarchar(255), "stopArea" nvarchar(255), "isSuperUser" bit NOT NULL CONSTRAINT "DF_9c8295df44b6c4c5413ef9cce76" DEFAULT 0, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e11e649824a45d8ed01d597fd93" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_80ca6e6ef65fb9ef34ea8c90f42" DEFAULT getdate(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "message" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_ba01f0a3e0123651915008bc578" DEFAULT NEWSEQUENTIALID(), "email" nvarchar(255) NOT NULL, "fullName" nvarchar(255) NOT NULL, "message" text NOT NULL, "createdAt" datetime2 NOT NULL CONSTRAINT "DF_19d7362db248a3df27fc29b507a" DEFAULT getdate(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "driver" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_61de71a8d217d585ecd5ee3d065" DEFAULT NEWSEQUENTIALID(), "fullName" nvarchar(255) NOT NULL, "phoneNumber" nvarchar(255), "cnicNumber" nvarchar(255) NOT NULL, CONSTRAINT "UQ_077d41cbc293c3efe9dbe480648" UNIQUE ("cnicNumber"), CONSTRAINT "PK_61de71a8d217d585ecd5ee3d065" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bus_stop" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_52b2402e9c73fbc734fa960935a" DEFAULT NEWSEQUENTIALID(), "stopName" varchar(255) NOT NULL, "latitude" float NOT NULL, "longitude" float NOT NULL, CONSTRAINT "PK_52b2402e9c73fbc734fa960935a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_08affcd076e46415e5821acf52d" DEFAULT NEWSEQUENTIALID(), "routeName" nvarchar(255) NOT NULL, "routeNumber" nvarchar(255) NOT NULL, "vehicleNumber" nvarchar(255) NOT NULL, "driverId" uniqueidentifier, CONSTRAINT "UQ_f1ecfaee7fb49933cfb8157a063" UNIQUE ("routeNumber"), CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "route_bus_stops_bus_stop" ("routeId" uniqueidentifier NOT NULL, "busStopId" uniqueidentifier NOT NULL, CONSTRAINT "PK_4108c4c31b9096f43bb4a1f8107" PRIMARY KEY ("routeId", "busStopId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43b31cb56ee17f2524ebb31179" ON "route_bus_stops_bus_stop" ("routeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3cfc07be3e9621a3152f7f2a65" ON "route_bus_stops_bus_stop" ("busStopId") `);
        await queryRunner.query(`ALTER TABLE "route" ADD CONSTRAINT "FK_6d09896c24b59b274026fad9949" FOREIGN KEY ("driverId") REFERENCES "driver"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_43b31cb56ee17f2524ebb311797" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" ADD CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655" FOREIGN KEY ("busStopId") REFERENCES "bus_stop"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_3cfc07be3e9621a3152f7f2a655"`);
        await queryRunner.query(`ALTER TABLE "route_bus_stops_bus_stop" DROP CONSTRAINT "FK_43b31cb56ee17f2524ebb311797"`);
        await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_6d09896c24b59b274026fad9949"`);
        await queryRunner.query(`DROP INDEX "IDX_3cfc07be3e9621a3152f7f2a65" ON "route_bus_stops_bus_stop"`);
        await queryRunner.query(`DROP INDEX "IDX_43b31cb56ee17f2524ebb31179" ON "route_bus_stops_bus_stop"`);
        await queryRunner.query(`DROP TABLE "route_bus_stops_bus_stop"`);
        await queryRunner.query(`DROP TABLE "route"`);
        await queryRunner.query(`DROP TABLE "bus_stop"`);
        await queryRunner.query(`DROP TABLE "driver"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}

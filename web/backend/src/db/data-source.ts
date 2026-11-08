
// settings for postgres db 


// import { DataSource } from "typeorm";
// import config from "../config"
// export const AppDataSource = new DataSource({
//   type: "postgres",
//   // url: config.db.url,
//   host: config.db.host,
//   port: config.db.port,
//   username: config.db.username || "postgres",
//   password: config.db.password,
//   database: config.db.database,
//   entities: ['src/**/*.entity{.ts,.js}'],
//   migrations: ['src/db/migrations/*{.ts,.js}'],
//   migrationsTableName: "migrations",
//   synchronize: false,


//   logging: true
// });

// AppDataSource.initialize()
//   .then(() => console.log("Database connected"))
//   .catch((error) => console.error("Database connection failed:", error));


import { DataSource } from "typeorm";
import config from "../config";

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/db/migrations/*{.ts,.js}'],
  migrationsTableName: "migrations",
  synchronize: false,
  logging: true,

 
 
  options: {
    encrypt: false, // disable encryption (you can change to true in production)
    trustServerCertificate: true // ✅ allow self-signed certificate
    
  }
});

AppDataSource.initialize()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection failed:", error));

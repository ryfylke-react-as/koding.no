import { connect } from "http2";
import mysql, { Connection } from "mysql2";

const connectionString = process.env.DATABASE_URL;
/* const user = connectionString.split("mysql://")[1].split(":")[0];
const password = connectionString
  .split("mysql://")[1]
  .split(":")[1]
  .split("@")[0];
const host = connectionString
  .split("mysql://")[1]
  .split(":")[1]
  .split("@")[1]; */

export const connection =
  mysql.createConnection(connectionString);

export const query = (query: string) => {
  return new Promise<
    | mysql.OkPacket
    | mysql.RowDataPacket[]
    | mysql.ResultSetHeader[]
    | mysql.RowDataPacket[][]
    | mysql.OkPacket[]
    | mysql.ProcedureCallPacket
  >((resolve, reject) => {
    connection.query(query, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

export const execute = (query: string, input: any[]) => {
  return new Promise<
    | mysql.OkPacket
    | mysql.RowDataPacket[]
    | mysql.ResultSetHeader[]
    | mysql.RowDataPacket[][]
    | mysql.OkPacket[]
    | mysql.ProcedureCallPacket
  >((resolve, reject) => {
    connection.execute(query, input, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

import mysql, { Connection } from "mysql2";

export const connection = mysql.createConnection(
  process.env.DATABASE_URL
);

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

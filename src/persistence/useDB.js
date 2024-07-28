import * as SQLite from "expo-sqlite";

export const useDB = () => {
  const openDatabase = async () => {
    const db = await SQLite.openDatabaseAsync("sessions.db");
    return db;
  };

  const initDB = async () => {
    const db = await openDatabase();
    const sql = `CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);`;
    await db.execAsync(sql);
  };

  const insertSession = async ({ email, localId, token }) => {
    const db = await openDatabase();
    const sql = `INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);`;
    const args = [localId, email, token];
    await db.runAsync(sql, args);
  };

  const getSession = async () => {
    const db = await openDatabase();
    const sql = `SELECT * FROM sessions;`;
    const firstRow = await db.getFirstAsync(sql);
    return firstRow;
  };

  const truncateSessionTable = async () => {
    const db = await openDatabase();
    const sql = `DELETE FROM sessions;`;
    await db.execAsync(sql);
  };

  return {
    initDB,
    insertSession,
    getSession,
    truncateSessionTable,
  };
};

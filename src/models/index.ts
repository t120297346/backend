import pool from "../database";

const find = async (tableName: string, attribute: string, targetName: string) => {
  const [entity]: any = await pool.query(`SELECT * FROM ${tableName} WHERE ${attribute} = ?`, [targetName]);
  return entity;
};

const insert = async (tableName: string, data: any) => {
  const keys = Object.keys(data);
  const values = Object.values(data);
  console.log(data)
  console.log(keys.join(","));
  console.log(values.join(","));
  console.log(Array(values.length).fill('?').join(", "))
  try {
    await pool.query(`INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${Array(values.length).fill('?').join(", ")})`, values);
  } catch (error) {
    console.error("Error inserting into database:", error);
    throw error;
  }
  return;
};

module.exports = {
    find,
    insert,
}

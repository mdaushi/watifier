import { lowDbInit } from "./lowdb.js";

const isTokenValid = (token) => {
  const key = process.env.KEY;
  if (token != key) {
    return false;
  }
  return true;
};

const applyingToken = async (token, { id, username, first_name }) => {
  const lowdb = await lowDbInit();
  lowdb.data ||= { users: [] };

  lowdb.data.users.push({
    token: token,
    telegramId: id,
    username: username,
    first_name: first_name,
  });

  await lowdb.write();
};

export { isTokenValid, applyingToken };

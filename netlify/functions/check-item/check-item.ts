import { Handler, HandlerContext } from "@netlify/functions";
import { execute } from "../utils";

const getChecked = async (user: string, item: string) => {
  const rows = await execute(
    `select * from user_progress where user = ? and item = ?`,
    [user, item]
  );
  return Array.isArray(rows) && rows.length > 0;
};

const addCheck = async (user: string, item: string) => {
  await execute(
    `insert into user_progress (user, item) values (?, ?)`,
    [user, item]
  );
};

const deleteCheck = async (user: string, item: string) => {
  await execute(
    `delete from user_progress where user = ? and item = ?`,
    [user, item]
  );
};

const checkItem = async (user: string, item: string) => {
  const isChecked = await getChecked(user, item);
  if (!isChecked) {
    await addCheck(user, item);
  } else {
    await deleteCheck(user, item);
  }
};

export const handler: Handler = async (
  event,
  context: HandlerContext
) => {
  const { item = "stranger" } = event.queryStringParameters;

  let checked = false;
  try {
    const user = context?.clientContext?.user?.sub;
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Unauthorized",
        }),
      };
    }
    await checkItem(user, item);
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unable to toggle progress item",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Checked`,
      checked,
    }),
  };
};

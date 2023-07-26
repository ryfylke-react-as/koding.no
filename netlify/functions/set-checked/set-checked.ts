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
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: "Method Not Allowed",
      }),
    };
  }
  try {
    const newChecked = JSON.parse(event.body ?? "{}");
    if (!Array.isArray(newChecked?.items)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Bad Request, items array is required",
        }),
      };
    }
    const user = context?.clientContext?.user?.sub;
    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Unauthorized",
        }),
      };
    }
    await execute("delete from user_progress where user = ?", [
      user,
    ]);

    if (newChecked.items.length > 0) {
      const values = newChecked.items
        .map(() => `(?, ?)`)
        .join(", ");

      await execute(
        `insert into user_progress (user, item) values ${values}`,
        newChecked.items
          .map((item: string) => [user, item])
          .flat()
      );
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User progress updated",
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unable to update user progress",
      }),
    };
  }
};

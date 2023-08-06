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
    const body: {
      id: string;
    } = JSON.parse(event.body ?? "{}");
    if (!body?.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Bad Request, id is required",
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
    const alreadyChecked = await getChecked(user, body.id);
    if (alreadyChecked) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Already completed",
        }),
      };
    }
    await addCheck(user, body.id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User progress updated",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
      }),
    };
  }
};

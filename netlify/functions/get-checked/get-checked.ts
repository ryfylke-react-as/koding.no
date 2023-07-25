import { Handler, HandlerContext } from "@netlify/functions";
import { execute } from "../utils";

const getChecked = async (user: string) => {
  const rows = await execute(
    `select * from user_progress where user = ?`,
    [user]
  );
  if (!Array.isArray(rows)) {
    throw new Error();
  }
  return rows;
};

export const handler: Handler = async (
  event,
  context: HandlerContext
) => {
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
    const checkedRows = await getChecked(user);
    return {
      statusCode: 200,
      body: JSON.stringify({
        checked: checkedRows.map((row) => row.item),
      }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Unable to get checked rows",
      }),
    };
  }
};

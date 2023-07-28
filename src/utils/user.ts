import * as crypto from "crypto";
import { MD5 } from ".";

export const getImageUrl = (email: string) => {
  const md5 = MD5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${md5}?s=200&d=identicon`;
};

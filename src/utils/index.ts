import {
  ProgressionRecord,
  ValidateUniquePaths,
} from "../types";

export function createProgressionMap<
  TKeys extends string,
  T extends Record<
    string,
    {
      konsepter: ProgressionRecord<TKeys>;
      kodesprak: ProgressionRecord<TKeys>;
      ferdigheter: ProgressionRecord<TKeys>;
    }
  > = Record<
    string,
    {
      konsepter: ProgressionRecord<TKeys>;
      kodesprak: ProgressionRecord<TKeys>;
      ferdigheter: ProgressionRecord<TKeys>;
    }
  >
>(
  arg: ValidateUniquePaths<
    T[string]["konsepter" | "kodesprak" | "ferdigheter"]
  > extends true
    ? T
    : never
) {
  return arg;
}

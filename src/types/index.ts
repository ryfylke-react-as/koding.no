type GetLeafPaths<T, K extends keyof T = keyof T> = K extends K
  ? T[K] extends object
    ? `${GetLeafPaths<T[K]> & string}${K & string}.`
    : `${K & string}.`
  : never;

type ExtractLeafName<Path extends string> =
  Path extends `${infer LeafName}.${string}` ? LeafName : never;

export type ValidateUniquePaths<T, Paths = GetLeafPaths<T>> = {
  [K in Paths &
    string]: ExtractLeafName<K> extends ExtractLeafName<
    Exclude<Paths, K> & string
  >
    ? true
    : false;
} extends Record<string, false>
  ? true
  : false;

type UniqueObjectKeys<T> = ValidateUniquePaths<T> extends true
  ? T
  : never;

type CommonKeys<T extends object> = keyof T;

type AllKeys<T> = T extends any ? keyof T : never;
type Subtract<A, C> = A extends C ? never : A;
type NonCommonKeys<T extends object> = Subtract<
  AllKeys<T>,
  CommonKeys<T>
>;
type PickType<T, K extends AllKeys<T>> = T extends {
  [k in K]?: any;
}
  ? T[K]
  : undefined;
type PickTypeOf<
  T,
  K extends string | number | symbol
> = K extends AllKeys<T> ? PickType<T, K> : never;
type Merge<T extends object> = {
  [k in CommonKeys<T>]: PickTypeOf<T, k>;
} & {
  [k in NonCommonKeys<T>]?: PickTypeOf<T, k>;
};

/** { uniqueId: "Label for checkbox" } */
export type ProgressionRecord<T extends string> = {
  [K in T]?: {
    label: string;
    level: 1 | 2 | 3;
  };
};

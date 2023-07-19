import React from "react";

type UseLocalStorageOpts<T> = [T] extends [string]
  ? {
      id: string;
      defaultValue?: T;
    }
  : {
      id: string;
      defaultValue?: T;
      serialize: (value: T) => string;
      deserialize: (value: string) => T;
    };

export function useLocalStorageState<T>(
  opts: UseLocalStorageOpts<T>
): [T, (value: T) => void] {
  const initialValue = React.useMemo(() => {
    if (typeof window === "undefined") return opts.defaultValue;
    const ls = localStorage.getItem(opts.id);
    return ls
      ? "deserialize" in opts
        ? opts.deserialize(ls)
        : (ls as T)
      : opts.defaultValue;
  }, []);
  const [value, setValue] = React.useState<T>(initialValue);

  const onChange = (value: T) => {
    setValue(value);
    localStorage.setItem(
      opts.id,
      "serialize" in opts
        ? opts.serialize(value)
        : (value as string)
    );
  };

  return [value, onChange];
}

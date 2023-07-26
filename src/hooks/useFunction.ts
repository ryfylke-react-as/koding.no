import { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";

export function useLazyGetFunction<T = unknown>(
  name: string,
  init: RequestInit & {
    params?: URLSearchParams;
  } = {}
): [
  (
    getInit?: RequestInit & {
      params?: URLSearchParams;
    }
  ) => Promise<T | null>,
  {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    error: any;
  }
] {
  const auth = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFunction = async (
    getInit = init
  ): Promise<T | null> => {
    setLoading(true);
    try {
      const headers = new Headers();
      if (auth.isLoggedIn) {
        const user = auth.currentUser();
        headers.set(
          "Authorization",
          `Bearer ${user.token.access_token}`
        );
      }
      const data = await fetch(
        `/.netlify/functions/${name}?${
          getInit?.params?.toString?.() ?? ""
        }`,
        {
          ...getInit,
          headers,
        }
      ).then((res) => res.json());
      setData(data);
      setLoading(false);
      return data as T;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  };

  return [
    getFunction,
    {
      data,
      isLoading: loading,
      isError: error,
      error,
    },
  ];
}

export function useGetFunction<T = unknown>(
  name: string,
  init: RequestInit & {
    params?: URLSearchParams;
    skip?: boolean;
  } = {},
  dependencies: any[] = [init?.skip]
) {
  const auth = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    setLoading(true);
    const headers = new Headers();
    if (auth.isLoggedIn) {
      const user = auth?.currentUser();
      headers.set(
        "Authorization",
        `Bearer ${user.token.access_token}`
      );
    }
    try {
      const data = await fetch(
        `/.netlify/functions/${name}?${
          init?.params?.toString?.() ?? ""
        }`,
        {
          ...init,
          headers,
        }
      ).then((res) => res.json());
      setData(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (init.skip) {
      return;
    }
    refetch();
  }, dependencies);

  return {
    data,
    isLoading: loading,
    isError: error,
    error,
    refetch,
  };
}

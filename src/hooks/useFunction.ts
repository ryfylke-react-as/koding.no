import { useEffect, useState } from "react";

export function useLazyGetFunction<T = unknown>(
  name: string,
  init: RequestInit = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getFunction = async (): Promise<T | null> => {
    setLoading(true);
    try {
      const data = await fetch(
        `/.netlify/functions/${name}`,
        init
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
  init: RequestInit = {},
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/.netlify/functions/${name}`, init)
      .then((res) =>
        res.json().then((data) => {
          setData(data);
          setLoading(false);
        })
      )
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, dependencies);

  return {
    data,
    isLoading: loading,
    isError: error,
    error,
  };
}

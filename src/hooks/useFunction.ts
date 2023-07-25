import { useEffect, useState } from "react";

export function useFunction(
  name: string,
  init: RequestInit = {},
  dependencies: any[] = []
) {
  const [data, setData] = useState(null);
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

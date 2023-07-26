import { QueryKey, useQuery } from "react-query";

type UseQueryArgs<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Parameters<
  typeof useQuery<TQueryFnData, TError, TData, TQueryKey>
>;

export default function useLazyQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  key: UseQueryArgs<TQueryFnData, TError, TData, TQueryKey>[0],
  fn: UseQueryArgs<TQueryFnData, TError, TData, TQueryKey>[1],
  options: UseQueryArgs<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  >[2] = {}
): [
  ReturnType<
    typeof useQuery<TQueryFnData, TError, TData, TQueryKey>
  >["refetch"],
  ReturnType<
    typeof useQuery<TQueryFnData, TError, TData, TQueryKey>
  >
] {
  const query = useQuery(key, fn, {
    ...options,
    enabled: false,
  });

  return [query.refetch, query];
}

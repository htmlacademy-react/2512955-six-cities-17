export function getSearchParam<TSeachParams extends Record<string, unknown>, TKey extends keyof TSeachParams>(
  searchParams: URLSearchParams,
  key: TKey,
  defaultValue: TSeachParams[TKey]): TSeachParams[TKey] {
  return (searchParams.get(key as string) ?? defaultValue) as TSeachParams[TKey];
}

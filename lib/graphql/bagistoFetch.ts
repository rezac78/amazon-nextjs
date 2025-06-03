interface BagistoFetchParams<TVariables> {
 query: string;
 variables?: TVariables;
 headers?: {
  token?: string;
 };
}

export async function bagistoFetch<TData = unknown, TVariables = Record<string, unknown>>({
 query,
 variables,
 headers,
}: BagistoFetchParams<TVariables>): Promise<TData> {
 const result = await fetch("/api/proxy/graphql", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
   Authorization: headers?.token ? `Bearer ${headers.token}` : "",
  },
  body: JSON.stringify({query, variables}),
 });

 const json = await result.json();
 if (json.errors) {
  throw json.errors[0];
 }
 return json.data;
}

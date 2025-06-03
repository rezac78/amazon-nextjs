export async function bagistoFetch({query, variables, headers}: {query: string; variables?: any; headers?: any}) {
 const result = await fetch("/api/proxy/graphql", {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
   Authorization: `Bearer ${headers?.token}`, // یا هر جور توکن لازم داری
  },
  body: JSON.stringify({
   query,
   variables,
  }),
 });

 const json = await result.json();
 if (json.errors) {
  throw json.errors[0];
 }
 return json.data;
}

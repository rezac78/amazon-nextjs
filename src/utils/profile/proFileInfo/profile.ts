const BASE_URL_API = process.env.BASE_URL_API;
export async function ProfileCustomer(Token: string) {
 try {
  const response = await fetch(BASE_URL_API + "customer/get", {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
  });

  const resData = await response.json();
  if (resData.errors) {
   throw resData.errors[0];
  }

  return resData.data;
 } catch (err) {
  console.error("Logout Error:", err);
  throw err;
 }
}
export async function ProfileCustomerUpdate(Data: FormData, Token: string) {
 try {
  const response = await fetch(BASE_URL_API + "customer/profile", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
   body: Data,
  });

  const resData = await response.json();
  if (resData.errors) {
   throw resData.errors[0];
  }

  return resData.data;
 } catch (err) {
  console.error("Logout Error:", err);
  throw err;
 }
}

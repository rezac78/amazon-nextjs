const BASE_URL_API = process.env.BASE_URL_API;
export async function ProfileAddressFetch(Data: any, Token: string) {
 const preparedData = {
  ...Data,
  address: Array.isArray(Data.address) ? Data.address : [Data.address], // فقط اگر string بود، تبدیل به array کن
 };

 try {
  const response = await fetch(`${BASE_URL_API}customer/addresses`, {
   method: "POST",
   headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
   body: JSON.stringify(preparedData),
  });

  const resData = await response.json();
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Address Submit Error:", err);
  throw err;
 }
}

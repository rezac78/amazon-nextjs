import {BASE_URL_API} from "@/config";
import {Address} from "@/utils/types";

export async function ProfileAddressFetch(Data: Address, Token: string) {
 const preparedData = {
  ...Data,
  address: Array.isArray(Data.address) ? Data.address : [Data.address],
 };

 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/addresses`, {
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
export async function ProfileAddressAll(Token: string) {
 try {
  const response = await fetch(BASE_URL_API + "v1/customer/addresses", {
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
export async function UpdateProfileAddress(id: number, Data: Address, Token: string) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/addresses/${id}`, {
   method: "PUT",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
   body: JSON.stringify({
    ...Data,
    address: Data.address,
   }),
  });

  const resData = await response.json();

  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Update Address Error:", err);
  throw err;
 }
}
export async function DeletedProfileAddress(id: number, Token: string) {
 try {
  const response = await fetch(`${BASE_URL_API}v1/customer/addresses/${id}`, {
   method: "DELETE",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
  });

  const resData = await response.json();
  console.log(resData);
  if (resData.errors) throw resData.errors[0];
  return resData.data;
 } catch (err) {
  console.error("Update Address Error:", err);
  throw err;
 }
}

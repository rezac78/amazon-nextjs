export async function registerCustomer(input: {
 firstName: string;
 lastName: string;
 email: string;
 password: string;
 passwordConfirmation: string;
 subscribedToNewsLetter?: boolean;
 agreement?: boolean;
}) {
 try {
  const response = await fetch(process.env.BASE_URL_API + "customer/register", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    password: input.password,
    password_confirmation: input.passwordConfirmation,
    subscribed_to_news_letter: input.subscribedToNewsLetter ?? false,
    agreement: input.agreement ?? false,
   }),
  });

  const resData = await response.json();

  if (resData.errors) {
   throw resData.errors[0];
  }

  return resData;
 } catch (err) {
  console.error("Registration Error:", err);
  throw err;
 }
}
export async function loginCustomer(input: {
 email: string;
 password: string;
 remember?: boolean;
 device_name?: string;
}) {
 try {
  const response = await fetch(process.env.BASE_URL_API + `customer/login`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
   },
   body: JSON.stringify(input),
  });

  const resData = await response.json();

  if (!response.ok || resData.errors) {
   throw resData.errors?.[0] || resData.message || "Login failed";
  }

  return resData;
 } catch (err) {
  console.error("Login Error:", err);
  throw err;
 }
}
// process.env.BASE_URL_API
export async function forgotPassword(email: string) {
 try {
  const response = await fetch(process.env.BASE_URL_API + "customer/forget-password", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({email}),
  });

  const resData = await response.json();

  if (resData.errors) {
   throw resData.errors[0];
  }

  return resData.data.forgotPassword;
 } catch (err) {
  console.error("Forgot Password Error:", err);
  throw err;
 }
}
export async function logoutCustomer(Token: string) {
 try {
  const response = await fetch(process.env.BASE_URL_API + "customer/logout", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Token}`,
   },
  });

  const resData = await response.json();
  if (resData.errors) {
   throw resData.errors[0];
  }

  return resData.message;
 } catch (err) {
  console.error("Logout Error:", err);
  throw err;
 }
}

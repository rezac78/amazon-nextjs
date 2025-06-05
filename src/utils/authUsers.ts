import { FORGOT_PASSWORD } from "@/graphql/authCustomer/forgot/forgot";
import { CUSTOMER_LOGIN } from "@/graphql/authCustomer/login/login";
import { CUSTOMER_LOGOUT } from "@/graphql/authCustomer/logout/logout";
import { REGISTER_CUSTOMER } from "@/graphql/authCustomer/register/register";
import { BASE_URL } from "./config";


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
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: REGISTER_CUSTOMER,
        variables: {
          input,
        },
      }),
    });

    const resData = await response.json();

    if (resData.errors) {
      throw resData.errors[0];
    }

    return resData.data.customerSignUp;
  } catch (err) {
    console.error("Registration Error:", err);
    throw err;
  }
}
export async function loginCustomer(input: {
  email: string;
  password: string;
  remember?: boolean;
}) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CUSTOMER_LOGIN,
        variables: {
          input,
        },
      }),
    });

    const resData = await response.json();

    if (resData.errors) {
      throw resData.errors[0];
    }

    return resData.data.customerLogin;
  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
}
export async function forgotPassword(email: string) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: FORGOT_PASSWORD,
        variables: { email },
      }),
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
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${Token}`,
      },
      body: JSON.stringify({
        query: CUSTOMER_LOGOUT,
      }),
    });

    const resData = await response.json();

    if (resData.errors) {
      throw resData.errors[0];
    }

    return resData.data.customerLogout;
  } catch (err) {
    console.error("Logout Error:", err);
    throw err;
  }
}

import { GET_CATEGORIESHOME_QUERY } from "@/graphql/categoriesHome/categoriesHome";

import { BASE_URL } from "./config";

export async function categories() {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GET_CATEGORIESHOME_QUERY,
      }),
    });

    const resData = await response.json();

    if (resData.errors) {
      throw resData.errors[0];
    }

    return resData.data.homeCategories;
  } catch (err) {
    console.error("Gategories Error:", err);
    throw err;
  }
}

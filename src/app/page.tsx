import { cookies } from "next/headers";
import { fetchProducts } from "@/utils/fetchProduct";
import HomePage from "../components/pages/home";
import { categories } from "@/utils/fetchhome";

export default async function Home() {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;
        const { data } = await fetchProducts({ page: 1, limit: 12 });
        const categorie = await categories();

        return (
                <div className="container mx-auto">
                        <HomePage isLogin={!!token} data={data} categorie={categorie}
                        />
                </div>
        );
}

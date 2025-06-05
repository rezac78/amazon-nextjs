import { cookies } from "next/headers";
import { fetchProducts } from "@/utils/fetchProduct";
import HomePage from "../components/pages/home";

export default async function Home() {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token")?.value;
        const { data, pageInfo } = await fetchProducts({ page: 1, limit: 12 });
        return (
                <div className="container mx-auto">
                        <HomePage isLogin={!!token} data={data} pageInfo={pageInfo}
                        />
                </div>
        );
}

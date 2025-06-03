import HomePage from "../components/pages/home";
import {fetchProducts} from "utils/fetchProduct";

export default async function Home() {
 const {data, pageInfo} = await fetchProducts({page: 1, limit: 12});
 return (
  <div className="container mx-auto">
   <HomePage data={data} pageInfo={pageInfo} />
  </div>
 );
}

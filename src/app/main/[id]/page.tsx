import Categories from "@/components/pages/categories";
import {getCategoryAttributes} from "@/utils/fetchSearch";

export default async function CategoriesPage() {
 const {data} = await getCategoryAttributes("0");

 return (
  <div className="container mx-auto">
   <Categories Data={data} />
  </div>
 );
}

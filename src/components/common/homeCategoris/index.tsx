import { CategoryHome } from "@/utils/types";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import Link from "next/link";

interface HomeCategoriesProps {
        Data: CategoryHome[];
}
export default function HomeCategoris({ Data }: HomeCategoriesProps) {
        return (
                <NavigationMenu
                        viewport={false}
                        className="text-white bg-transparent px-2 py-1"
                >
                        <NavigationMenuList className="gap-2">
                                {Data.map((category) => (
                                        <NavigationMenuItem  key={category.id}>
                                                {category.children && category.children.length > 0 ? (
                                                        <>
                                                                <NavigationMenuTrigger  className="bg-transparent text-white hover:underline px-2 py-1">
                                                                        {category.name}
                                                                </NavigationMenuTrigger>
                                                                <NavigationMenuContent className="bg-white text-black shadow-md border  rounded-md mt-1 ">
                                                                        <ul className="grid w-[250px] gap-2 p-2 text-sm ">
                                                                                {category.children.map((child) => (
                                                                                        <li key={child.id}>
                                                                                                <NavigationMenuLink asChild>
                                                                                                        <Link
                                                                                                                href={`/category/${child.slug}`}
                                                                                                                className="block hover:bg-transparent"
                                                                                                        >
                                                                                                                {child.name}
                                                                                                        </Link>
                                                                                                </NavigationMenuLink>
                                                                                        </li>
                                                                                ))}
                                                                        </ul>
                                                                </NavigationMenuContent>
                                                        </>
                                                ) : (
                                                        <NavigationMenuLink asChild>
                                                                <Link
                                                                        href={`/category/${category.slug}`}
                                                                        className="px-2 py-1 text-sm hover:underline hover:bg-transparent"
                                                                >
                                                                        {category.name}
                                                                </Link>
                                                        </NavigationMenuLink>
                                                )}
                                        </NavigationMenuItem>
                                ))}
                        </NavigationMenuList>
                </NavigationMenu>
        );
}

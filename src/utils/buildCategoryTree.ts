import {CategoryHome} from "./types";

export function buildCategoryTree(data: CategoryHome[]): CategoryHome[] {
 const map = new Map<number, CategoryHome & {children: CategoryHome[]}>();
 const roots: CategoryHome[] = [];

 data.forEach((cat) => {
  map.set(cat.id, {...cat, children: []});
 });

 map.forEach((cat) => {
  if (cat.parent_id === 1 || cat.parent_id === null) {
   roots.push(cat);
  } else {
   const parent = map.get(cat.parent_id);
   if (parent) {
    parent.children?.push(cat);
   }
  }
 });

 return roots;
}

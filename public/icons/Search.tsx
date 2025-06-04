import React from "react";

const SearchIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
 <svg
  {...props}
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
 >
  <path d="m21 21-4.34-4.34" />
  <circle cx="11" cy="11" r="8" />
 </svg>
);

export default SearchIcon;

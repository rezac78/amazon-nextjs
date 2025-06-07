import React from "react";

const GridIcon = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
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
  <path d="M12 3v18" />
  <path d="M3 12h18" />
  <rect x="3" y="3" width="18" height="18" rx="2" />
 </svg>
);

export default GridIcon;

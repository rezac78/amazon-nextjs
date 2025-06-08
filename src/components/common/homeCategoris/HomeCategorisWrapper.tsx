import {useEffect, useRef, useState} from "react";
import HomeCategorisSkeleton from "../SkeletonComponent/homeCategoris";
import HomeCategoris from ".";
import {CategoryHome} from "@/utils/types";

const HomeCategorisWrapper = ({Data, useIn}: {Data: CategoryHome[]; useIn: string}) => {
 const [show, setShow] = useState(false);
 const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
  const element = ref.current;
  if (!element) return;

  const observer = new IntersectionObserver(
   ([entry], obs) => {
    if (entry.isIntersecting) {
     setShow(true);
     obs.disconnect();
    }
   },
   {threshold: 0.1}
  );

  observer.observe(element);

  return () => {
   observer.unobserve(element);
  };
 }, []);

 return <div ref={ref}>{show ? <HomeCategoris Data={Data} useIn={useIn} /> : <HomeCategorisSkeleton count={4} />}</div>;
};

export default HomeCategorisWrapper;

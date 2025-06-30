import {getDiscountPercent} from "@/utils/priceUtils";
import s from "./ribbon.module.css";
import {Product} from "@/utils/types/types";

const DiscountRibbon = ({Data}: {Data: Product}) => {
 return (
  <div className={`${s.ribbon} ${s.ribbonTopLeft}`}>
   <span>{getDiscountPercent(Data)} تخفیف</span>
  </div>
 );
};

export default DiscountRibbon;

import {CustomerInfo} from "@/utils/types";
import ProfileLayoutComponent from "./common/profileLayout";
interface ProfileProps {
 Token: string;
 ProfileInfoData: CustomerInfo;
}

export default function Profile({ProfileInfoData, Token}: ProfileProps) {
 return (
  <div className="flex flex-col lg:flex-row gap-6 container mx-auto p-4">
   <ProfileLayoutComponent Token={Token} ProfileInfoData={ProfileInfoData} />
  </div>
 );
}

import {ReactNode} from "react";
import ProfileLayoutComponent from "../../components/pages/profile/common/profileLayout";
import {getAuthToken} from "@/utils/checkCookies";
import {ProfileCustomer} from "@/utils/profile/proFileInfo/profile";

interface LayoutProps {
 children: ReactNode;
 onLogout: () => void;
}

export default async function Layout({children}: LayoutProps) {
 const Token = await getAuthToken();
 const ProfileInfo = await ProfileCustomer(Token ?? "");
 return (
  <div className="flex flex-col lg:flex-row gap-6 container mx-auto p-4">
   <ProfileLayoutComponent Token={Token} ProfileInfoData={ProfileInfo} />
   <section className="flex-1 bg-white shadow-md rounded-xl p-6">{children}</section>
  </div>
 );
}

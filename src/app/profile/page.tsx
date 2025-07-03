import ProfileInfo from "@/components/pages/profile/profileInfo";
import {getAuthToken} from "@/utils/checkCookies";
import {ProfileCustomer} from "@/utils/api/profile/proFileInfo/profile";

export default async function ProfilePage() {
 const Token = await getAuthToken();
 const ProfileInfoData = await ProfileCustomer(Token ?? "");
 return (
  <div className="container mx-auto">
   <ProfileInfo Data={ProfileInfoData} Token={Token ?? ""} />
  </div>
 );
}

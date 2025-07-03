import ProfileAddress from "@/components/pages/profile/ProfileAddress";
import {getAuthToken} from "@/utils/checkCookies";
import {ProfileAddressAll} from "@/utils/api/profile/proFileAddress";

export default async function ProfilePage() {
 const Token = await getAuthToken();
 const ProfileAdress = await ProfileAddressAll(Token ?? "");
 return (
  <div className="container mx-auto">
   <ProfileAddress Data={ProfileAdress} Token={Token || ""} />
  </div>
 );
}

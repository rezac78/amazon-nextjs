import Profile from "@/components/pages/profile";
import ProfileAddress from "@/components/pages/profile/ProfileAddress";
import {getAuthToken} from "@/utils/checkCookies";
import {ProfileCustomer} from "@/utils/profile/proFileInfo/profile";

export default async function ProfilePage() {
 const Token = await getAuthToken();
//  const ProfileInfo = await ProfileCustomer(Token ?? "");
 return (
  <div className="container mx-auto">
   <ProfileAddress Token={Token || ""} />
  </div>
 );
}

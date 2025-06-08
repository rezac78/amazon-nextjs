import Profile from "@/components/pages/profile";
import {getAuthToken} from "@/utils/checkCookies";

export default async function ProfilePage() {
 const Token = await getAuthToken();
 return (
  <div className="container mx-auto">
   <Profile Token={Token || ""} />
  </div>
 );
}

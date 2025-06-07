import Profile from "@/components/pages/profile";
import { cookies } from "next/headers";

export default async function ProfilePage() {
        const cookieStore = await cookies();
        const Token = cookieStore.get("access_token")?.value;
        return (
                <div className="container mx-auto">
                        <Profile Token={Token || ""} />
                </div>
        );
}

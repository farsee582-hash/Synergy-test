import { getContent } from "@/lib/get-content";
import HeaderClient from "./HeaderClient";

export default async function Header() {
    const phoneData = await getContent("header_phone");
    const phone = phoneData?.content || "+971-42210009";

    return <HeaderClient phone={phone} />;
}

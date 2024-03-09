import Image from "next/image";
import Link from "next/link";
import logoImage from "@/public/logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logoImage} alt="PetSoft Logo" />
    </Link>
  );
};
export default Logo;

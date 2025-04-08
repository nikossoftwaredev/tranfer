import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const Logo = ({ className, onClick }: LogoProps) => {
  return (
    <Link
      href="/"
      className={`flex items-center ${className || ""}`}
      onClick={onClick}
    >
      <Image
        src="/images/logo.png"
        alt="Poseidon Transfers"
        width={100}
        height={100}
        className="h-auto"
        priority
      />
    </Link>
  );
};

export default Logo;

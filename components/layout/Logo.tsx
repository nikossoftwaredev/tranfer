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
        src="/images/logo-small.png"
        alt="Poseidon Transfers"
        width={40}
        height={40}
        className="h-auto"
        priority
      />
    </Link>
  );
};

export default Logo;

import { Link } from "react-router-dom";

interface AuthFooterProps {
  title: string;
  subtitle: string;
  href: string;
}

export const AuthFooter = ({ title, subtitle, href }: AuthFooterProps) => {
  return (
    <div className="my-3 flex items-center justify-center md:items-start md:justify-start">
      <h1 className="text-md font-semibold">
        {title}
        {"  "}
        <Link to={href} className="hover:underline text-muted-foreground">
          {subtitle}
        </Link>
      </h1>
    </div>
  );
};

import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="max-w-3xl mx-auto py-3 px-4 flex items-center justify-center gap-x-3 gap-y-2">
      <p className="text-sm text-gray-500 dark:text-neutral-400">
        © 2024 DevSocial
      </p>
      <span className="text-xs text-muted-foreground group">
        Check out the source code on{" "}
        <Link
          to="https://github.com/K1chel/dev-social-2.0"
          target="_blank"
          className="group-hover:underline hover:text-zinc-900 dark:hover:text-zinc-100 transition-all"
        >
          Github
        </Link>
      </span>
    </div>
  );
};

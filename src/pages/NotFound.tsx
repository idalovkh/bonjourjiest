import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWhitePageBackground } from "@/hooks/use-white-page-background";
import { brandPageTitle } from "@/lib/brand";

const NotFound = () => {
  useWhitePageBackground();

  useEffect(() => {
    document.title = brandPageTitle("Страница не найдена");
  }, []);

  return (
    <div className="flex min-h-screen min-h-screen-ios items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Страница не найдена</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          На главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

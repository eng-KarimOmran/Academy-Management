import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function LanguageToggle() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (newLang: "ar" | "en") => {
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.resolvedLanguage || i18n.language;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentLang === "ar" ? (
            <img src="/ar.png" className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <img src="/en.png" className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="capitalize"
          onClick={() => handleLanguageChange("ar")}
        >
          عربي
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize"
          onClick={() => handleLanguageChange("en")}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

"use client";

import { useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", dir: "rtl" },
];

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setCurrentLanguage(language);
    // Here you would implement actual language switching logic
    // e.g., using next-intl or i18next
    console.log(`Switching to ${language.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center space-x-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="hidden sm:inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
            {currentLanguage.flag} {currentLanguage.name}
          </span>
          <ChevronDown className="w-3 h-3 text-gray-500 dark:text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className={cn(
              "flex items-center justify-between cursor-pointer",
              currentLanguage.code === language.code && "bg-blue-50 dark:bg-blue-900/20"
            )}
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{language.flag}</span>
              <span className={cn(
                "text-sm",
                language.code === "fa" && "font-arabic"
              )}>
                {language.name}
              </span>
            </div>
            {currentLanguage.code === language.code && (
              <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
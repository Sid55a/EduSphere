import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGE_VERSIONS } from "./constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({
  language,
  onSelect,
}: {
  language: string;
  onSelect: any;
}) => {
  return (
    <div className="ml-2 mb-2">
      <div className="flex gap-2  items-center">
        <p className="text-sm mb-2">Language:</p>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline"
              size="sm"
             >{language}
             </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
              <DropdownMenuGroup>
                {languages.map((lang, i) => (
                  <DropdownMenuItem key={i} onClick={() => onSelect(lang[0])}>
                    <p
                      className={cn(
                        " text-gray-400 text-sm hover:text-blue-400",
                        lang[0] === language && "text-blue-400"
                      )}
                    >
                      {lang[0]}{" "}
                      <span className="text-gray-500 text-xs">({lang[1]})</span>
                    </p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
export default LanguageSelector;

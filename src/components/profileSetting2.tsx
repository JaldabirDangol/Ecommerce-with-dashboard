import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CreditCard, Settings, User } from "lucide-react";
import Link from "next/link";

const settingsItem = [
  {
    icon: <User className="mr-2 h-4 w-4" />,
    name: "Account Settings",
    tab: "profile",
  },
  {
    icon: <Settings className="mr-2 h-4 w-4" />,
    name: "Preferences",
    tab: "notifications", 
  },
  {
    icon: <CreditCard className="mr-2 h-4 w-4" />,
    name: "Billing",
    tab: "billing",
  },
];

const ProfileSetting2 = () => {
  return (
    <DropdownMenuGroup>
      {settingsItem.map((item, idx) => (
        <Link
          key={idx}
          href={`/profile?tab=${item.tab}`} 
          passHref
        >
          <DropdownMenuItem className="cursor-pointer p-3 flex items-center">
            {item.icon}
            <span>{item.name}</span>
          </DropdownMenuItem>
        </Link>
      ))}
    </DropdownMenuGroup>
  );
};

export default ProfileSetting2;

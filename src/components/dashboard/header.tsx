import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export const Header = () => (
  <div className="flex justify-between w-full h-full p-4  bg-gray-100 rounded-2xl">

    <h2 className="flex gap-2"> <p className="text-green-400">HexaMart</p> Admin </h2>
   <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

    </div>
)



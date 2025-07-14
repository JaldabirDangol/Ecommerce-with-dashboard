import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const ProfilSection = ()=>{
    return (
        <div className="flex items-center bg-white rounded-2xl p-2 gap-2" >

            <h2>username surname</h2>
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
        </div>
    )
}
"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"

export const ProfilSection = ()=>{

    const {data:session} = useSession();

    console.log(session?.user?.image)

    return (
        <div className="flex items-center bg-white rounded-2xl p-2 gap-2" >

            <h2>{session?.user?.name}</h2>
<Avatar>
  <AvatarImage 

    src={session?.user?.image?.trim() || undefined}
    alt={session?.user?.name ?? "User"}
    className="w-10 h-10 rounded-full object-cover"
  />
  <AvatarFallback>
    {session?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2) ?? "?"}
  </AvatarFallback>
</Avatar>

        </div>
    )
}
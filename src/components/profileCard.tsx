"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";

const ProfileCard = () => {
  return (
  <Card className="rounded-2xl shadow-md">
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/profile.jpg" alt="Profile" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">Jaldabir Dangol</CardTitle>
                  <p className="text-gray-500">Kathmandu, Nepal</p>
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Pencil size={16} /> Edit
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <p>Jaldabir Dangol</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p>nepaltopup106@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>+977 9800000000</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Default Address</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
           <hr className="my-4 border-t border-gray-200" />
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <p>Kathmandu, Nepal, 44600</p>
              </div>
            </CardContent>
          </Card>
  )
}

export default ProfileCard
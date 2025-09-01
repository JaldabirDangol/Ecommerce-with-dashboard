"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Trash } from "lucide-react";
import { toast } from "sonner";
const DeleteAccount = () => {

  const deleteAccountHandler = async () => {
  try {
    const res = await fetch('/api/account/delete', { method: 'DELETE' });

    if (!res.ok) {
      console.error('Failed to delete account');
      toast('Something went wrong while deleting your account.');
      return;
    }

    toast('Account deleted successfully!');
   window.location.href = "/login";
  } catch (err) {
    console.error('Error deleting account:', err);
    toast('An error occurred while deleting your account.');
  }
};
  return (
       <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Lock size={18} /> Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={deleteAccountHandler} variant="destructive" className="flex items-center gap-2">
                <Trash size={16} /> Delete Account
              </Button>
            </CardContent>
          </Card>
  )
}

export default DeleteAccount
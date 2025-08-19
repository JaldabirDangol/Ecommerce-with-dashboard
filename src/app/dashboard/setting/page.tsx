import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BellIcon, SettingsIcon, UserIcon, MailIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// Define a type for the settings state
interface UserSettings {
  name: string;
  email: string;
  receiveMarketingEmails: boolean;
  receiveProductUpdates: boolean;
  notificationsEnabled: boolean;
}

const DashboardSettingsPage: React.FC = () => {
  // Use useState to manage the form data
  const [settings, setSettings] = useState<UserSettings>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    receiveMarketingEmails: true,
    receiveProductUpdates: false,
    notificationsEnabled: true,
  });

  // Handle changes to form inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle changes for the Switch component
  const handleSwitchChange = (id: string, checked: boolean) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [id]: checked,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving settings:', settings);
    // Here you would typically call a server action or API route to save the data
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="flex-1 flex flex-col p-4 md:p-8 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Toaster />
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile and application preferences.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" onClick={handleSubmit}>
            <SettingsIcon className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Settings Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-5 w-5 text-gray-500" />
              <CardTitle>Profile</CardTitle>
            </div>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={settings.name} 
                  onChange={handleInputChange} 
                  placeholder="Enter your full name" 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={settings.email} 
                  onChange={handleInputChange} 
                  placeholder="Enter your email" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BellIcon className="h-5 w-5 text-gray-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure how you receive notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notificationsEnabled">Enable Push Notifications</Label>
                <p className="text-sm text-gray-500">Receive alerts on your device.</p>
              </div>
              <Switch
                id="notificationsEnabled"
                checked={settings.notificationsEnabled}
                onCheckedChange={(checked) => handleSwitchChange('notificationsEnabled', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="receiveMarketingEmails">Marketing Emails</Label>
                <p className="text-sm text-gray-500">
                  Receive promotional and marketing updates.
                </p>
              </div>
              <Switch
                id="receiveMarketingEmails"
                checked={settings.receiveMarketingEmails}
                onCheckedChange={(checked) => handleSwitchChange('receiveMarketingEmails', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="receiveProductUpdates">Product Updates</Label>
                <p className="text-sm text-gray-500">
                  Get notified about new features and improvements.
                </p>
              </div>
              <Switch
                id="receiveProductUpdates"
                checked={settings.receiveProductUpdates}
                onCheckedChange={(checked) => handleSwitchChange('receiveProductUpdates', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default DashboardSettingsPage;

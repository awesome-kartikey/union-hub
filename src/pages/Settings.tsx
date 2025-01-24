import MainNav from "@/components/MainNav";
import { Card } from "@/components/ui/card";
import ProfileForm from "@/components/ProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container py-8">
        <h1 className="text-4xl font-display font-bold mb-8">Account Settings</h1>
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card className="p-6">
              <ProfileForm />
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Account Management</h3>
                  <p className="text-muted-foreground">
                    Manage your account settings and preferences
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="privacy">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Privacy Settings</h3>
                  <p className="text-muted-foreground">
                    Control who can see your profile and contact you
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
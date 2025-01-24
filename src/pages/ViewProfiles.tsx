import { Card } from "@/components/ui/card";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart } from "lucide-react";

const ViewProfiles = () => {
  const profiles = [
    {
      name: "Priya Sharma",
      age: 28,
      occupation: "Software Engineer",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Rahul Verma",
      age: 30,
      occupation: "Business Analyst",
      location: "Delhi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    // Add more profiles as needed
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container py-8">
        <h1 className="text-4xl font-display font-bold mb-8">Browse Profiles</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile, index) => (
            <Card key={index} className="overflow-hidden">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{profile.name}</h3>
                <p className="text-muted-foreground">
                  {profile.age} years • {profile.location}
                </p>
                <p className="text-muted-foreground mb-4">{profile.occupation}</p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Connect
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfiles;
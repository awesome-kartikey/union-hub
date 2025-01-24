import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, MessageCircle, Search } from "lucide-react";
import MainNav from "@/components/MainNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MainNav />
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4 md:py-32">
        <div className="container mx-auto text-center animate-fade-down">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Match
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Join thousands of people who have found their life partner through our platform
          </p>
          <Button size="lg" variant="secondary" className="text-lg">
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="p-6 text-center card-hover">
                <div className="mb-4 flex justify-center">
                  <step.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden card-hover">
                <img
                  src={story.image}
                  alt={story.names}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{story.names}</h3>
                  <p className="text-gray-600">{story.story}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Ready to Find Your Soulmate?
          </h2>
          <Button size="lg" variant="secondary" className="text-lg">
            Create Your Profile
          </Button>
        </div>
      </section>
    </div>
  );
};

const steps = [
  {
    icon: Users,
    title: "Create Profile",
    description: "Sign up and create your detailed profile",
  },
  {
    icon: Search,
    title: "Browse Matches",
    description: "Find compatible matches based on your preferences",
  },
  {
    icon: Heart,
    title: "Connect",
    description: "Send interest to profiles you like",
  },
  {
    icon: MessageCircle,
    title: "Communicate",
    description: "Start conversations with your matches",
  },
];

const successStories = [
  {
    names: "Priya & Rahul",
    story: "Found each other through our platform and got married in 2023",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  },
  {
    names: "Sarah & Ahmed",
    story: "Connected over their shared love for travel and tied the knot",
    image: "https://images.unsplash.com/photo-1529634597503-139d3726fed5?w=800",
  },
  {
    names: "Anjali & Vikram",
    story: "Their cultural compatibility brought them together forever",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800",
  },
];

export default Index;

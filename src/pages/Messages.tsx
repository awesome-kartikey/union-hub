import MainNav from "@/components/MainNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const Messages = () => {
  const conversations = [
    {
      name: "Priya Sharma",
      lastMessage: "Hi, I saw your profile and would like to connect",
      time: "2 mins ago",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      name: "Rahul Verma",
      lastMessage: "Thank you for accepting my connection request",
      time: "1 hour ago",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container py-8">
        <h1 className="text-4xl font-display font-bold mb-8">Messages</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 p-4">
            <div className="space-y-4">
              {conversations.map((conversation, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer"
                >
                  <img
                    src={conversation.image}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">{conversation.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {conversation.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="lg:col-span-2 p-4 flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="space-y-4">
                {/* Chat messages will go here */}
                <p className="text-center text-muted-foreground">
                  Select a conversation to start chatting
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Type your message..." className="flex-1" />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
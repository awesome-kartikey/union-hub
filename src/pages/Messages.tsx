import { useEffect, useState, useRef } from "react";
import MainNav from "@/components/MainNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Check, CheckCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_read: boolean;
}

interface ConversationUser {
  full_name: string;
  profile_photo_url: string;
}

interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  last_message: string;
  last_updated: string;
  user1: ConversationUser;
  user2: ConversationUser;
}

const Messages = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser(user.id);
        fetchConversations(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const fetchConversations = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          *,
          user1: profiles!conversations_user1_id_fkey (full_name, profile_photo_url),
          user2: profiles!conversations_user2_id_fkey (full_name, profile_photo_url)
        `)
        .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
        .order("last_updated", { ascending: false });

      if (error) throw error;
      setConversations(data || []);
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error fetching conversations",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);
      scrollToBottom();
    } catch (error: any) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation || !currentUser) return;

    setSendingMessage(true);
    try {
      const { error } = await supabase.from("messages").insert([
        {
          conversation_id: activeConversation.id,
          sender_id: currentUser,
          content: newMessage,
        },
      ]);

      if (error) throw error;
      setNewMessage("");
    } catch (error: any) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.id);

      // Subscribe to new messages
      const channel = supabase
        .channel("messages")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${activeConversation.id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new as Message]);
            scrollToBottom();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [activeConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTimestamp = (timestamp: string) => {
    return format(new Date(timestamp), "p");
  };

  const getPartnerInfo = (conversation: Conversation) => {
    if (!currentUser) return { name: "", photo: "" };
    const isUser1 = conversation.user1_id === currentUser;
    const partner = isUser1 ? conversation.user2 : conversation.user1;
    return {
      name: partner.full_name || "User",
      photo: partner.profile_photo_url,
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container py-8">
        <h1 className="text-4xl font-display font-bold mb-8">Messages</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 p-4">
            <div className="space-y-4">
              {loading ? (
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-full" />
                      </div>
                    </div>
                  ))
              ) : (
                conversations.map((conversation) => {
                  const partner = getPartnerInfo(conversation);
                  return (
                    <div
                      key={conversation.id}
                      className={`flex items-center gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer ${
                        activeConversation?.id === conversation.id
                          ? "bg-accent"
                          : ""
                      }`}
                      onClick={() => setActiveConversation(conversation)}
                    >
                      <Avatar>
                        <AvatarImage src={partner.photo} />
                        <AvatarFallback>
                          {partner.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{partner.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.last_message}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {conversation.last_updated &&
                          formatTimestamp(conversation.last_updated)}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
          <Card className="lg:col-span-2 p-4 flex flex-col h-[600px]">
            {activeConversation ? (
              <>
                <div className="border-b pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={getPartnerInfo(activeConversation).photo}
                      />
                      <AvatarFallback>
                        {getPartnerInfo(activeConversation)
                          .name.substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-semibold">
                      {getPartnerInfo(activeConversation).name}
                    </h2>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_id === currentUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender_id === currentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.content}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs opacity-70">
                            {formatTimestamp(message.created_at)}
                          </span>
                          {message.sender_id === currentUser && (
                            <span className="ml-1">
                              {message.is_read ? (
                                <CheckCheck className="h-3 w-3" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                <form onSubmit={sendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sendingMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start chatting
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
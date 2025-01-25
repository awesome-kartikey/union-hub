import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import MainNav from "@/components/MainNav";
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Profile {
  id: string;
  full_name: string;
  age?: number;
  profession?: string;
  city?: string;
  religion?: string;
  caste?: string;
  profile_photo_url?: string;
}

const ViewProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    religion: "",
    caste: "",
    city: "",
    minAge: "",
    maxAge: "",
  });

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from("profiles")
        .select("*");

      // Apply filters
      if (filters.religion) {
        query = query.eq("religion", filters.religion);
      }
      if (filters.caste) {
        query = query.eq("caste", filters.caste);
      }
      if (filters.city) {
        query = query.eq("city", filters.city);
      }
      if (filters.minAge || filters.maxAge) {
        const today = new Date();
        if (filters.minAge) {
          const maxDate = new Date(today.getFullYear() - parseInt(filters.minAge), today.getMonth(), today.getDate());
          query = query.lte("date_of_birth", maxDate.toISOString());
        }
        if (filters.maxAge) {
          const minDate = new Date(today.getFullYear() - parseInt(filters.maxAge), today.getMonth(), today.getDate());
          query = query.gte("date_of_birth", minDate.toISOString());
        }
      }

      const { data, error } = await query;

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast.error("Error fetching profiles: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [filters]);

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container py-8">
        <h1 className="text-4xl font-display font-bold mb-8">Browse Profiles</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Search Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select
              value={filters.religion}
              onValueChange={(value) => setFilters({ ...filters, religion: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Religion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hindu">Hindu</SelectItem>
                <SelectItem value="Muslim">Muslim</SelectItem>
                <SelectItem value="Christian">Christian</SelectItem>
                <SelectItem value="Sikh">Sikh</SelectItem>
                <SelectItem value="Buddhist">Buddhist</SelectItem>
                <SelectItem value="Jain">Jain</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.caste}
              onValueChange={(value) => setFilters({ ...filters, caste: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Caste" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Brahmin">Brahmin</SelectItem>
                <SelectItem value="Kshatriya">Kshatriya</SelectItem>
                <SelectItem value="Vaishya">Vaishya</SelectItem>
                <SelectItem value="OBC">OBC</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />

            <div className="flex gap-4">
              <Input
                type="number"
                placeholder="Min Age"
                value={filters.minAge}
                onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Max Age"
                value={filters.maxAge}
                onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Profiles Grid */}
        {loading ? (
          <div className="text-center">Loading profiles...</div>
        ) : profiles.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No profiles found matching your criteria
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden">
                <img
                  src={profile.profile_photo_url || "/placeholder.svg"}
                  alt={profile.full_name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{profile.full_name}</h3>
                  <p className="text-muted-foreground">
                    {profile.age} years • {profile.city}
                  </p>
                  <p className="text-muted-foreground mb-2">
                    {profile.religion} {profile.caste ? `• ${profile.caste}` : ""}
                  </p>
                  <p className="text-muted-foreground mb-4">{profile.profession}</p>
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
        )}
      </div>
    </div>
  );
};

export default ViewProfiles;
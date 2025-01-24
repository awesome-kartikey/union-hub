import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface ProfileFormData {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  height: number;
  weight: number;
  complexion: string;
  physicalDisability: string;
  email: string;
  phoneNumber: string;
  city: string;
  country: string;
  religion: string;
  caste: string;
  motherTongue: string;
  languagesKnown: string;
  educationQualification: string;
  degree: string;
  profession: string;
  annualIncome: number;
  professionalStatus: string;
  familyType: string;
  parentsOccupation: string;
  siblingsDetails: string;
  familyValueSystem: string;
  preferredAgeMin: number;
  preferredAgeMax: number;
  preferredHeightMin: number;
  preferredHeightMax: number;
  expectedQualification: string;
  preferredProfession: string;
  preferredLocation: string;
  maritalStatusPreference: string;
  hobbies: string;
  interests: string;
  dietaryPreferences: string;
  smokingHabits: boolean;
  drinkingHabits: boolean;
}

const ProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<ProfileFormData>();

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("No user found");

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: data.fullName,
        date_of_birth: data.dateOfBirth,
        gender: data.gender,
        height: data.height,
        weight: data.weight,
        complexion: data.complexion,
        physical_disability: data.physicalDisability,
        email: data.email,
        phone_number: data.phoneNumber,
        city: data.city,
        country: data.country,
        religion: data.religion,
        caste: data.caste,
        mother_tongue: data.motherTongue,
        languages_known: data.languagesKnown.split(",").map((lang) => lang.trim()),
        education_qualification: data.educationQualification,
        degree: data.degree,
        profession: data.profession,
        annual_income: data.annualIncome,
        professional_status: data.professionalStatus,
        family_type: data.familyType,
        parents_occupation: data.parentsOccupation,
        siblings_details: data.siblingsDetails,
        family_value_system: data.familyValueSystem,
        preferred_age_range: `[${data.preferredAgeMin},${data.preferredAgeMax})`,
        preferred_height_range: `[${data.preferredHeightMin},${data.preferredHeightMax})`,
        expected_qualification: data.expectedQualification,
        preferred_profession: data.preferredProfession,
        preferred_location: data.preferredLocation,
        marital_status_preference: data.maritalStatusPreference,
        hobbies: data.hobbies.split(",").map((hobby) => hobby.trim()),
        interests: data.interests.split(",").map((interest) => interest.trim()),
        dietary_preferences: data.dietaryPreferences,
        smoking_habits: data.smokingHabits,
        drinking_habits: data.drinkingHabits,
      });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Personal Information</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add similar FormField components for all other fields */}
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
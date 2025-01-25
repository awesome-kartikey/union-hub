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
        {/* Personal Information */}
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
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your gender" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your height" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your weight" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complexion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complexion</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your complexion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="physicalDisability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Physical Disability (if any)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter any physical disability" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Contact Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Religious & Cultural Details */}
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Religious & Cultural Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your religion" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caste"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caste/Community</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your caste/community" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motherTongue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Tongue</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mother tongue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="languagesKnown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Languages Known (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter languages known" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Professional Background */}
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Professional Background</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="educationQualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Qualification</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your education qualification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="degree"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Degree</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your degree" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession/Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your profession" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annualIncome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter your annual income" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="professionalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your professional status" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Family Details */}
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Family Details</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="familyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Nuclear/Joint" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentsOccupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parents' Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter parents' occupation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="siblingsDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Siblings' Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter siblings' details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyValueSystem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family Value System</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter family value system" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Marital Preferences */}
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Marital Preferences</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="preferredAgeMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Age (Minimum)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Minimum age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredAgeMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Age (Maximum)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Maximum age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="preferredHeightMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Height (Minimum in cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Minimum height" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferredHeightMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Height (Maximum in cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Maximum height" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="expectedQualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Qualification</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter expected qualification" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredProfession"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter preferred profession" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter preferred location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatusPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status Preference</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter marital status preference" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Additional Optional Fields */}
        <div className="space-y-6">
          <div className="text-2xl font-display font-semibold">Additional Optional Fields</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="hobbies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hobbies (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your hobbies" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interests (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your interests" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dietaryPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dietary Preferences</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter dietary preferences" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="smokingHabits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Smoking Habits</FormLabel>
                    <FormControl>
                      <Input type="checkbox" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="drinkingHabits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Drinking Habits</FormLabel>
                    <FormControl>
                      <Input type="checkbox" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
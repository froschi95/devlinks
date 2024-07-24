import { Profile } from "../../types";
import ProfileForm from "./ProfileForm";

interface ProfileDetailsProps {
  profile: Profile | null;
  onSaveProfile: (updatedProfile: Profile) => void;
}

export default function ProfileDetails({
  profile,
  onSaveProfile,
}: ProfileDetailsProps) {
  return (
    <div className="bg-white h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4 ">Profile Details</h2>
        <p>Add your details to create a personal touch to your profile.</p>
      </div>
    </div>
  );
  {
    /* <ProfileForm
        key={JSON.stringify(profile)}
        initialData={profile || undefined}
        onSave={onSaveProfile}
      /> */
  }
}

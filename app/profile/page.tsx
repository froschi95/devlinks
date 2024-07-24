"use client";

import { useState, useEffect } from "react";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileForm from "../components/profile/ProfileForm";
import PreviewProfile from "../components/profile/PreviewProfile";
import Header from "../components/Header";
import { Profile, Link } from "../types";
import { signOut } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { withAuth } from "../components/auth/WithAuth";

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchLinks(user.uid);
      fetchProfile(user.uid);
    }
  }, []);

  const fetchLinks = (userId: string) => {
    const userLinksDoc = doc(db, "links", userId);

    onSnapshot(userLinksDoc, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setLinks(data.links || []);
      } else {
        setLinks([]);
      }
    });
  };

  const fetchProfile = async (userId: string) => {
    const docRef = doc(db, "profiles", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setProfile(docSnap.data() as Profile);
    }
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login"; // or wherever you want to redirect
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <main className="px-4 pb-4 md:px-6 md:pb-6 h-screen flex flex-col">
      <Header />
      <div className="flex-grow mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="hidden bg-white lg:grid lg:place-items-start lg:w-full h-full">
            <div className="m-auto h-screen">
              <PreviewProfile profile={profile || undefined} links={links} />
            </div>
          </div>
          <div className="w-full h-full lg:col-span-2 bg-white p-6 lg:p-10">
            <ProfileForm
              key={JSON.stringify(profile)}
              initialData={profile || undefined}
              onSave={handleSaveProfile}
            />
            <div className="mt-8 text-center">
              <p
                onClick={handleLogout}
                className="cursor-pointer px-6 py-2 text-[#737373] hover:text-red-600 transition-colors"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ProfilePage);

{
  /* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="hidden pt-4 lg:block bg-white">
            <PreviewProfile profile={profile || undefined} links={links} />
          </div>
          <div className="w-full lg:col-span-2 bg-white p-6 lg:p-10 overflow-auto">
            <ProfileDetails
              profile={profile}
              onSaveProfile={handleSaveProfile}
            />
          </div> */
}

"use client";

import { useState, useEffect } from "react";
import ProfileDetails from "../components/Dashboard/ProfileDetails";
import PreviewProfile from "../components/Dashboard/PreviewProfile";
import Header from "../components/Header";
import { Profile, Link } from "../types";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { withAuth } from "../components/WithAuth";

function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    fetchProfile();
    fetchLinks();
  }, []);

  const fetchProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data() as Profile);
      }
    }
  };

  const fetchLinks = async () => {
    onSnapshot(
      collection(db, "links"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const linksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLinks(linksData as Link[]);
      }
    );
  };

  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  return (
    <main className="px-4 pb-4 md:px-6 md:pb-6 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="hidden pt-4 lg:block bg-white">
            <PreviewProfile profile={profile || undefined} links={links} />
          </div>
          <div className="w-full lg:col-span-2 bg-white p-6 lg:p-10 overflow-auto">
            <ProfileDetails
              profile={profile}
              onSaveProfile={handleSaveProfile}
            />
          </div>
        </div>
      </div>
    </main>
    // <main className="p-4 md:p-6">
    //   <Header />
    //   <div className="h-screen flex mt-6 space-x-8">
    //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    //       <div className="hidden lg:flex bg-white">
    //         <PreviewProfile profile={profile || undefined} links={links} />
    //       </div>
    //       <div className="w-full h-screen lg:col-span-2 bg-white p-6 lg:p-10 content-stretch">
    //         <ProfileDetails
    //           profile={profile}
    //           onSaveProfile={handleSaveProfile}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
}

export default withAuth(ProfilePage);

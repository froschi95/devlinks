"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProfilePreview from "../components/Dashboard/PreviewProfile";
import { Profile, Link } from "../types";

export default function PreviewPage() {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileDoc = await getDoc(doc(db, "profiles", user.uid));
        if (profileDoc.exists()) {
          setProfile(profileDoc.data() as Profile);
        }

        const linksDoc = await getDoc(doc(db, "links", user.uid));
        if (linksDoc.exists()) {
          setLinks(linksDoc.data().links || []);
        }
      }
    };

    fetchProfileAndLinks();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <ProfilePreview profile={profile} links={links} />
    </div>
  );
}

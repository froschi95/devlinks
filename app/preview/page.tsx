"use client";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import PublicPreview from "../components/PublicPreview";
import { Profile, Link } from "../types";
import { withAuth } from "../components/WithAuth";
import { v4 as uuidv4 } from "uuid";

const PreviewPage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [links, setLinks] = useState<Link[]>([]);
  const [shareableId, setShareableId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      const user = auth.currentUser;
      if (user) {
        const profileDoc = await getDoc(doc(db, "profiles", user.uid));
        if (profileDoc.exists()) {
          const profileData = profileDoc.data() as Profile;
          setProfile(profileData);
          setShareableId(profileData.shareableId || null);
        }

        const linksDoc = await getDoc(doc(db, "links", user.uid));
        if (linksDoc.exists()) {
          setLinks(linksDoc.data().links || []);
        }
      }
    };

    fetchProfileAndLinks();
  }, []);

  const generateShareableLink = async () => {
    const user = auth.currentUser;
    if (user && !shareableId) {
      const newShareableId = uuidv4().slice(0, 8);
      await setDoc(
        doc(db, "profiles", user.uid),
        { ...profile, shareableId: newShareableId },
        { merge: true }
      );
      setShareableId(newShareableId);
    }

    if (shareableId) {
      const shareableLink = `${window.location.origin}/${shareableId}`;
      navigator.clipboard.writeText(shareableLink);
      alert("Shareable link copied to clipboard!");
    }
  };

  return (
    <div className="mx-auto h-screen">
      <div className="absolute -z-50 top-0 left-0 sm:w-screen h-[22.3rem] bg-[#633CFF] rounded-b-[2rem]"></div>
      <nav className="flex justify-between items-center sm:m-6 p-4 font-semibold bg-white rounded-xl">
        <button className="text-[#633CFF] border border-[#633CFF] px-7 py-3 rounded-lg">
          <a href="/">Back to Editor</a>
        </button>
        <button
          className="bg-[#633CFF] text-white px-7 py-3 rounded-lg"
          onClick={generateShareableLink}
        >
          Share Link
        </button>
      </nav>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white rounded-3xl">
          <PublicPreview profile={profile} links={links} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(PreviewPage);

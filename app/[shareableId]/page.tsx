"use client";

import { useEffect, useState } from "react";
import { db } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import PublicPreview from "../components/profile/PublicPreview";
import { Profile, Link } from "../types";
import { useRouter } from "next/navigation";

interface PublicPreviewPageProps {
  params: {
    shareableId: string;
  };
}

export default function PublicPreviewPage({ params }: PublicPreviewPageProps) {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [links, setLinks] = useState<Link[]>([]);
  const router = useRouter();
  const { shareableId } = params;

  useEffect(() => {
    const fetchProfileAndLinks = async () => {
      console.log("Fetching profile for shareableId:", shareableId);
      if (shareableId) {
        const profilesRef = collection(db, "profiles");
        const q = query(profilesRef, where("shareableId", "==", shareableId));
        const querySnapshot = await getDocs(q);

        console.log("Query snapshot empty:", querySnapshot.empty);

        if (!querySnapshot.empty) {
          const profileDoc = querySnapshot.docs[0];
          const profileData = profileDoc.data() as Profile;
          console.log("Profile data:", profileData);
          setProfile(profileData);

          const linksDoc = await getDoc(doc(db, "links", profileDoc.id));
          if (linksDoc.exists()) {
            const linksData = linksDoc.data()?.links || [];
            console.log("Links data:", linksData);
            setLinks(linksData);
          }
        } else {
          console.log("No matching profile found");
          router.push("/404");
        }
      }
    };

    fetchProfileAndLinks();
  }, [shareableId, router]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-lg">
        <PublicPreview profile={profile} links={links} />
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";
// import { db } from "../utils/firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   getDoc,
//   doc,
// } from "firebase/firestore";
// import PublicPreview from "../components/PublicPreview";
// import { Profile, Link } from "../types";
// import { useRouter } from "next/navigation";

// interface PublicPreviewPageProps {
//   params: {
//     shareableId: string;
//   };
// }

// const PublicPreviewPage: React.FC<PublicPreviewPageProps> = ({ params }) => {
//   const [profile, setProfile] = useState<Profile | undefined>(undefined);
//   const [links, setLinks] = useState<Link[]>([]);
//   const router = useRouter();
//   const { shareableId } = params;

//   useEffect(() => {
//     const fetchProfileAndLinks = async () => {
//       console.log("Fetching profile for shareableId:", shareableId);
//       if (shareableId) {
//         const profilesRef = collection(db, "profiles");
//         const q = query(profilesRef, where("shareableId", "==", shareableId));
//         const querySnapshot = await getDocs(q);

//         console.log("Query snapshot empty:", querySnapshot.empty);

//         if (!querySnapshot.empty) {
//           const profileDoc = querySnapshot.docs[0];
//           const profileData = profileDoc.data() as Profile;
//           console.log("Profile data:", profileData);
//           setProfile(profileData);

//           const linksDoc = await getDoc(doc(db, "links", profileDoc.id));
//           if (linksDoc.exists()) {
//             const linksData = linksDoc.data()?.links || [];
//             console.log("Links data:", linksData);
//             setLinks(linksData);
//           }
//         } else {
//           console.log("No matching profile found");
//           router.push("/404");
//         }
//       }
//     };

//     fetchProfileAndLinks();
//   }, [shareableId, router]);

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-3xl shadow-lg">
//         <PublicPreview profile={profile} links={links} />
//       </div>
//     </div>
//   );
// };

// export default PublicPreviewPage;

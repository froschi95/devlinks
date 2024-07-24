"use client";

import { useState, useEffect } from "react";
import LinkEditor from "./components/link/LinkEditor";
import PreviewProfile from "./components/profile/PreviewProfile";
import { Link, Profile } from "./types";
import Header from "./components/Header";
import { withAuth } from "./components/auth/WithAuth";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
import { db, auth } from "./utils/firebase";

const Home: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

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
          <div className="w-full h-fit lg:col-span-2 bg-white p-6 lg:p-10">
            <LinkEditor links={links} setLinks={setLinks} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(Home);

// "use client";

// import { useState, useEffect } from "react";
// import LinkEditor from "./components/Dashboard/LinkEditor";
// import PreviewProfile from "./components/Dashboard/PreviewProfile";
// import { Link, Profile } from "./types";
// import Header from "./components/Header";
// import { withAuth } from "./components/WithAuth";
// import {
//   QuerySnapshot,
//   DocumentData,
//   collection,
//   onSnapshot,
//   doc,
//   getDoc,
// } from "firebase/firestore";
// import { db, auth } from "./utils/firebase";

// const Home: React.FC = () => {
//   const [links, setLinks] = useState<Link[]>([]);
//   const [profile, setProfile] = useState<Profile | null>(null);

//   useEffect(() => {
//     const user = auth.currentUser;
//     if (user) {
//       fetchLinks(user.uid);
//       fetchProfile(user.uid);
//     }
//   }, []);

//   const fetchLinks = (userId: string) => {
//     const userLinksDoc = doc(db, "links", userId);

//     onSnapshot(userLinksDoc, (docSnapshot) => {
//       if (docSnapshot.exists()) {
//         const data = docSnapshot.data();
//         setLinks(data.links || []);
//       } else {
//         setLinks([]);
//       }
//     });
//   };

//   const fetchProfile = async (userId: string) => {
//     const docRef = doc(db, "profiles", userId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setProfile(docSnap.data() as Profile);
//     }
//   };

//   return (
//     <main className="px-4 pb-4 md:px-6 md:pb-6 min-h-screen flex flex-col">
//       <Header />
//       <div className="flex-grow mt-6">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
//           <div className="hidden lg:grid lg:place-items-center h-screen">
//             <PreviewProfile profile={profile || undefined} links={links} />
//           </div>
//           <div className="w-full h-screen lg:col-span-2 bg-white p-6 lg:p-10 overflow-auto">
//             <LinkEditor />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default withAuth(Home);

"use client";

import { useState, useEffect } from "react";
import LinkEditor from "./components/Dashboard/LinkEditor";
import PreviewProfile from "./components/Dashboard/PreviewProfile";
import { Link, Profile } from "./types";
import Header from "./components/Header";
import { withAuth } from "./components/WithAuth";
import {
  QuerySnapshot,
  DocumentData,
  collection,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "./utils/firebase";

function Home() {
  const [links, setLinks] = useState<Link[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchLinks();
    fetchProfile();
  }, []);

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
    // const querySnapshot = await getDoc(collection(db, "links"));
    // const fetchedLinks = querySnapshot.docs.map(
    //   (doc) => ({ id: doc.id, ...doc.data() } as Link)
    // );
    // setLinks(fetchedLinks);
  };

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

  return (
    <main className="px-4 pb-4 md:px-6 md:pb-6 min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="hidden lg:block bg-white h-screen">
            <PreviewProfile profile={profile || undefined} links={links} />
          </div>
          <div className="w-full h-screen lg:col-span-2 bg-white p-6 lg:p-10 overflow-auto">
            <LinkEditor />
          </div>
        </div>
      </div>
    </main>
    // <main className="container mx-auto p-6">
    //   <Header />
    //   <div className="h-screen w-full mt-6 flex gap-8">
    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
    //       <div className="hidden lg:flex w-full bg-white">
    //         <PreviewProfile profile={profile || undefined} links={links} />
    //       </div>
    //       <div className="w-full p-10 bg-white">
    //         <LinkEditor />
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
}

export default withAuth(Home);
// import LinkEditor from "./components/Dashboard/LinkEditor";
// import PreviewProfile from "./components/Dashboard/PreviewProfile";
// import Header from "./components/Header";
// import Layout from "./components/Layout";

// export default function Home() {
//   return (
//     <main className="container mx-auto px-4 py-8">
//       <Header />
//       <div className="flex space-x-8">
//         <div className="w-1/3">
//           <PreviewProfile />
//         </div>
//         <div className="w-2/3">
//           <LinkEditor />
//         </div>
//       </div>
//     </main>
//   );
// }

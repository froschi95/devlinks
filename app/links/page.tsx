"use client";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import LinkForm from "../components/LinkForm";
import LinkList from "../components/LinkList";
import { db } from "../utils/firebase";
import {
  QuerySnapshot,
  DocumentData,
  collection,
  onSnapshot,
} from "firebase/firestore";

interface Link {
  id: string;
  url: string;
}

const Links = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [editingLink, setEditingLink] = useState<Link | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "links"),
      (snapshot: QuerySnapshot<DocumentData>) => {
        const linksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLinks(linksData as Link[]);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <h1>Links</h1>
      <LinkForm
        initialData={editingLink}
        onClose={() => setEditingLink(undefined)}
      />
      <LinkList links={links} setLinks={setLinks} />
    </Layout>
  );
};

export default Links;

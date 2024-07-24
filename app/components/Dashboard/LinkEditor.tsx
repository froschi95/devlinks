"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Link } from "../../types";
import LinkForm from "../LinkForm";
// import LinkList from "../LinkList";
import LinkItem from "../LinkItem";
import { collection, getDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../utils/firebase";

const GetStartedSection = () => (
  <div className="text-center py-10">
    <Image
      src="/path-to-your-image.png"
      alt="Get Started"
      width={200}
      height={200}
      className="mx-auto mb-6"
    />
    <h3 className="text-2xl font-bold mb-4">Let&apos;s get you started</h3>
    <p className="text-gray-600 max-w-md mx-auto">
      Use the &quot;Add new link&quot; button to get started. Once you have more
      than one link, you can reorder and edit them. We&apos;re here to help you
      share your profiles with everyone!
    </p>
  </div>
);

export default function LinkEditor() {
  const [links, setLinks] = useState<Link[]>([]);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (auth.currentUser) {
      fetchLinks();
    }
  }, []);

  const fetchLinks = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const docRef = doc(db, "links", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setLinks(docSnap.data().links || []);
    } else {
      setLinks([]);
    }
  };

  const handleAddLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      platform: "",
      url: "",
    };
    setLinks([...links, newLink]);
    setHasUnsavedChanges(true);
  };

  const handleUpdateLink = (updatedLink: Link) => {
    const updatedLinks = links.map((link) =>
      link.id === updatedLink.id ? updatedLink : link
    );
    setLinks(updatedLinks);
    setHasUnsavedChanges(true);
  };

  const handleRemoveLink = (id: string) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    await setDoc(doc(db, "links", userId), { links });
    setHasUnsavedChanges(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md relative min-h-screen">
      <h2 className="text-3xl font-bold mb-2">Customize your links</h2>
      <p className="text-gray-600 mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <button
        onClick={handleAddLink}
        className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-md mb-6 font-semibold hover:bg-purple-50 transition-colors"
      >
        + Add new link
      </button>

      {links.length === 0 ? (
        <GetStartedSection />
      ) : (
        links.map((link, index) => (
          <LinkItem
            key={link.id}
            link={link}
            index={index + 1}
            onUpdate={handleUpdateLink}
            onRemove={handleRemoveLink}
          />
        ))
      )}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

{
  /* {isAddingLink && (
        <LinkForm
          initialData={editingLink || undefined}
          onClose={() => {
            setIsAddingLink(false);
            setEditingLink(null);
          }}
          onSave={handleAddLink}
        />
      )}
      {links.length === 0 ? (
        <GetStartedSection />
      ) : (
        <LinkList
          links={links}
          setLinks={(newLinks) => {
            setLinks(newLinks);
            setHasUnsavedChanges(true);
          }}
          onEditLink={handleEditLink}
          onDeleteLink={handleDeleteLink}
        />
      )}
      {hasUnsavedChanges && (
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div> */
}

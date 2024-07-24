"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Link } from "../../types";
import LinkItem from "../link/LinkItem";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../../utils/firebase";

const GetStartedSection = () => (
  <div className="text-center py-10">
    <Image
      src="/Group 273.svg"
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

interface LinkEditorProps {
  links: Link[] | undefined;
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
}

export default function LinkEditor({ links, setLinks }: LinkEditorProps) {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    // console.log("Current links state:", links);
  }, [links]);

  const handleAddLink = () => {
    const newLink: Link = {
      id: Date.now().toString(),
      platform: "",
      url: "",
    };
    setLinks((prevLinks) => [...(prevLinks || []), newLink]);
    setHasUnsavedChanges(true);
  };

  const handleUpdateLink = (updatedLink: Link) => {
    setLinks((prevLinks) => {
      const newLinks = prevLinks.map((link) =>
        link.id === updatedLink.id ? { ...link, ...updatedLink } : link
      );
      // console.log("Updated links:", newLinks);
      return newLinks;
    });
    setHasUnsavedChanges(true);
  };

  const handleRemoveLink = (id: string) => {
    setLinks((prevLinks) => (prevLinks || []).filter((link) => link.id !== id));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId || !links) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const validLinks = links.filter((link) => link.platform && link.url);
      await setDoc(doc(db, "links", userId), { links: validLinks });
      setLinks(validLinks);
      setHasUnsavedChanges(false);
      // console.log("Saved links:", validLinks);
    } catch (error) {
      // console.error("Error saving links:", error);
      setSaveError("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white py-6 relative min-h-screen">
      <h2 className="text-3xl font-bold mb-2">Customize your links</h2>
      <p className="text-gray-600 mb-6">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <button
        onClick={handleAddLink}
        className="w-full py-3 border-2 border-[#633CFF] text-[#633CFF] rounded-md mb-6 font-semibold hover:bg-[#EFEBFF] transition-colors"
      >
        + Add new link
      </button>
      <div className="mb-7">
        {!links || links.length === 0 ? (
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
      </div>
      <div className="mt-auto py-6 px-4 sm:px-6 border-t bg-white h-24">
        <div className="my-auto sm:text-right">
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSaving || !links}
            className={`bg-[#633CFF] text-white font-semibold h-12 w-full sm:w-auto px-6 py-2 rounded-md transition-colors ${
              !hasUnsavedChanges || isSaving || !links
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-[#633CFF]"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          {saveError && <p className="text-red-500 mt-2">{saveError}</p>}
        </div>
      </div>
    </div>
  );
}

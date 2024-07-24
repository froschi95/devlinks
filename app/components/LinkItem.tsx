import { useState, useEffect, useRef } from "react";
import { Link } from "../types";
import Image from "next/image";

interface LinkItemProps {
  link: Link;
  index: number;
  onUpdate: (link: Link) => void;
  onRemove: (id: string) => void;
}

const platforms = [
  "GitHub",
  "Frontend Mentor",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "Codepen",
  "Freecodecamp",
  "Gitlab",
  "Hashnode",
  "Stack Overflow",
];

const LinkItem = ({ link, index, onUpdate, onRemove }: LinkItemProps) => {
  const [platform, setPlatform] = useState(link.platform);
  const [url, setUrl] = useState(link.url);
  const [errors, setErrors] = useState({ platform: "", url: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    validateInputs();
  }, [platform, url]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const validateInputs = () => {
    const newErrors = { platform: "", url: "" };

    if (!platform) {
      newErrors.platform = "Please select a platform";
    }

    if (!url) {
      newErrors.url = "URL is required";
    } else if (!isValidUrl(url)) {
      newErrors.url = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handlePlatformChange = (selectedPlatform: string) => {
    setPlatform(selectedPlatform);
    updateLink({ ...link, platform: selectedPlatform });
    setIsDropdownOpen(false);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    updateLink({ ...link, url: newUrl });
  };

  const updateLink = (updatedLink: Link) => {
    if (validateInputs()) {
      onUpdate(updatedLink);
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4 text-base text-[#737373]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          <span className="flex gap-2">
            <Image src={"/equals.svg"} width={12} height={6} alt="=" />
            Link #{index}
          </span>
        </h3>
        <button
          onClick={() => onRemove(link.id)}
          className="hover:text-red-500"
        >
          Remove
        </button>
      </div>
      <div className="mb-4 relative" ref={dropdownRef}>
        <label className="block text-xs text-[#333333] font-medium mb-1">
          Platform
        </label>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`w-full p-2 border rounded-md text-[#333333] bg-white text-left flex items-center justify-between ${
            errors.platform ? "border-red-500" : ""
          }`}
        >
          {platform ? (
            <>
              <span className="flex items-center">
                <Image
                  src={`/${platforms
                    .find((p) => p === platform)
                    ?.toLowerCase()}-icon.svg`}
                  alt={platform}
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-2"
                />
                {platform}
              </span>
            </>
          ) : (
            "Select a platform"
          )}
          <span className="ml-2">▼</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-y-auto">
            {platforms.map((platformOption) => (
              <button
                key={platformOption}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                onClick={() => handlePlatformChange(platformOption)}
              >
                <Image
                  src={`/dropdown/menu-${platformOption.toLowerCase()}-icon.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className="w-4 h-4 mr-2"
                />
                {platformOption}
              </button>
            ))}
          </div>
        )}
        {errors.platform && (
          <p className="text-red-500 text-xs mt-1">{errors.platform}</p>
        )}
      </div>
      {/* <div className="mb-4">
        <label className="block text-xs text-[#333333] font-medium mb-1">
          Platform
        </label>
        <select
          value={platform}
          onChange={handlePlatformChange}
          className={`w-full p-2 border rounded-md text-[#333333] ${
            errors.platform ? "border-red-500" : ""
          }`}
        >
          <option value="">Select a platform</option>
          {platforms.map((platformOption) => (
            <option key={platformOption} value={platformOption}>
              <span className="flex items-center">
                <Image
                  src={`/${platformOption.toLowerCase()}-icon.svg`}
                  alt=""
                  width={16}
                  height={16}
                  className="w-5 h-5 mr-2"
                />
                {platformOption}
              </span>
            </option>
          ))}
        </select>
        {errors.platform && (
          <p className="text-red-500 text-xs mt-1">{errors.platform}</p>
        )}
      </div> */}
      <div>
        <label className="block text-xs text-[#333333] font-medium mb-1">
          Link
        </label>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://www.example.com/username"
          className={`w-full p-2 border rounded-md ${
            errors.url ? "border-red-500" : ""
          }`}
        />
        {errors.url && (
          <p className="text-red-500 text-xs mt-1">{errors.url}</p>
        )}
      </div>
    </div>
  );
};

export default LinkItem;

// import { useState } from "react";
// import { Link } from "../types";

// interface LinkItemProps {
//   link: Link;
//   index: number;
//   onUpdate: (link: Link) => void;
//   onRemove: (id: string) => void;
// }

// const LinkItem = ({ link, index, onUpdate, onRemove }: LinkItemProps) => {
//   const [platform, setPlatform] = useState(link.platform);
//   const [url, setUrl] = useState(link.url);

//   const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPlatform(e.target.value);
//     onUpdate({ ...link, platform: e.target.value });
//   };

//   const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUrl(e.target.value);
//     onUpdate({ ...link, url: e.target.value });
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded-md mb-4 text-base text-[#737373]">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Link #{index}</h3>
//         <button
//           onClick={() => onRemove(link.id)}
//           className="hover:text-red-500"
//         >
//           Remove
//         </button>
//       </div>
//       <div className="mb-4">
//         <label className="block text-xs text-[#333333] font-medium mb-1">
//           Platform
//         </label>
//         <select
//           value={platform}
//           onChange={handlePlatformChange}
//           className="w-full p-2 border rounded-md text-[#333333]"
//         >
//           <option value="">Select a platform</option>
//           <option value="GitHub">GitHub</option>
//           <option value="YouTube">YouTube</option>
//           <option value="LinkedIn">LinkedIn</option>
//           {/* Add more platform options as needed */}
//         </select>
//       </div>
//       <div>
//         <label className="block text-xs text-[#333333] font-medium mb-1">
//           Link
//         </label>
//         <input
//           type="url"
//           value={url}
//           onChange={handleUrlChange}
//           placeholder="https://www.example.com/username"
//           className="w-full p-2 border rounded-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default LinkItem;

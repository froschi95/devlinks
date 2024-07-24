import { Link, Profile } from "../../types";
import Image from "next/image";

interface PreviewProfileProps {
  profile?: Profile;
  links?: Link[];
}

export default function PreviewProfile({
  profile,
  links = [],
}: PreviewProfileProps) {
  return (
    <div className="bg-white rounded-3xl border p-6 w-[308px] mx-auto">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
          {profile?.profilePicture && (
            <Image
              src={profile.profilePicture}
              alt="Profile"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-1">
          {profile ? `${profile.firstName} ${profile.lastName}` : "Your Name"}
        </h2>
        <p className="text-gray-500 mb-6">
          {profile?.email || "your.email@example.com"}
        </p>
      </div>
      <div className="space-y-4">
        {links
          .filter(
            (link): link is Link => !!link && !!link.platform && !!link.url
          )
          .map((link, index) => (
            <a
              key={index}
              href={link.url}
              className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${getLinkStyles(
                link.platform
              )}`}
            >
              <span className="flex items-center">
                <Image
                  src={`/${link.platform.toLowerCase()}-icon.svg`}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5 mr-2"
                />
                {link.platform}
              </span>
              <span>→</span>
            </a>
          ))}
      </div>
    </div>
  );
}

function getLinkStyles(platform: string): string {
  switch (platform) {
    case "GitHub":
      return "bg-black text-white";
    case "YouTube":
      return "bg-red-600 text-white";
    case "LinkedIn":
      return "bg-blue-600 text-white";
    default:
      return "bg-gray-200 text-gray-700";
  }
}

// import { Link, Profile } from "../../types";
// import Image from "next/image";

// interface PreviewProfileProps {
//   profile?: Profile;
//   links?: Link[];
// }

// export default function PreviewProfile({
//   profile,
//   links = [],
// }: PreviewProfileProps) {
//   return (
//     <div className="bg-white rounded-3xl shadow-lg p-6 w-[308px] mx-auto">
//       <div className="flex flex-col items-center">
//         <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
//           {profile?.profilePicture && (
//             <Image
//               src={profile.profilePicture}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           )}
//         </div>
//         <h2 className="text-2xl font-bold mb-1">
//           {profile?.name || "Your Name"}
//         </h2>
//         <p className="text-gray-500 mb-6">
//           {profile?.email || "your.email@example.com"}
//         </p>
//       </div>
//       <div className="space-y-4">
//         {links.map((link, index) => (
//           <a
//             key={index}
//             href={link.url}
//             className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${getLinkStyles(
//               link.platform
//             )}`}
//           >
//             <span className="flex items-center">
//               <Image
//                 src={`/${link.platform.toLowerCase()}-icon.svg`}
//                 alt=""
//                 className="w-5 h-5 mr-2"
//               />
//               {link.platform}
//             </span>
//             <span>→</span>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }

// function getLinkStyles(platform: string): string {
//   switch (platform) {
//     case "GitHub":
//       return "bg-black text-white";
//     case "YouTube":
//       return "bg-red-600 text-white";
//     case "LinkedIn":
//       return "bg-blue-600 text-white";
//     default:
//       return "bg-gray-200 text-gray-700";
//   }
// }

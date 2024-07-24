import { Link, Profile } from "../../types";
import Image from "next/image";
import ArrowRight from "../icons/ArrowRight";

interface PreviewProfileProps {
  profile?: Profile;
  links?: Link[];
}

export default function PreviewProfile({
  profile,
  links = [],
}: PreviewProfileProps) {
  return (
    <div className="relative w-[308px] h-[632px] mx-auto overflow-hidden rounded-3xl">
      {/* Background Image */}
      <Image
        src="/preview-section.svg"
        alt="Background"
        fill
        sizes="(max-width: 308px) 100vw, 308px"
        priority
        className="object-cover"
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-white bg-opacity-80 rounded-[3.2rem]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-14 p-6 h-full">
        <div className="flex flex-col items-center">
          <div className="mt-12 w-[6.5rem] h-[6.5rem] bg-gray-200 ring-4 ring-[#633CFF] rounded-full mb-4 overflow-hidden">
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
          <h2 className="text-lg font-bold mb-1 text-[#333333]">
            {profile ? `${profile.firstName} ${profile.lastName}` : "Your Name"}
          </h2>
          <p className="text-sm text-[#737373] mb-6">
            {profile?.email || "your.email@example.com"}
          </p>
        </div>
        <div className="space-y-4 w-full">
          {links
            .filter(
              (link): link is Link => !!link && !!link.platform && !!link.url
            )
            .map((link, index) => (
              <a
                key={index}
                href={link.url}
                className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity ${getLinkStyles(
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
                {/* <span>→</span> */}
                <span className={`${getLinkStyles(link.platform)}`}>
                  <ArrowRight />
                </span>
                {/* {console.log(getLinkStyles(link.platform))} */}
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}

function getLinkStyles(platform: string): string {
  switch (platform) {
    case "GitHub":
      return "bg-[#1a1a1a] text-white";
    case "YouTube":
      return "bg-[#EE3939] text-white";
    case "LinkedIn":
      return "bg-[#2D68FF] text-white";
    case "Twitter":
      return "bg-[#43B7E9] text-white";
    case "LinkedIn":
      return "bg-[#2D68FF] text-white";
    case "Facebook":
      return "bg-[#2442AC] text-white";
    case "Freecodecamp":
      return "bg-[#302267] text-white";
    case "Twitch":
      return "bg-[#ee3fc8] text-white";
    case "Dev.to":
      return "bg-[#333333] text-white";
    case "Codewars":
      return "bg-[#8A1A50] text-white";
    case "Codepen":
      return "bg-[#737373] text-white";
    case "Gitlab":
      return "bg-[#EB4925] text-white";
    case "Hashnode":
      return "bg-[#0330d1] text-white";
    case "Stack Overflow":
      return "bg-[#EC7100] text-white";
    default:
      return "bg-[#d9d9d9] text-[#333333]";
  }
}

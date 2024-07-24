import { useState } from "react";
import { Link } from "../types";

interface LinkItemProps {
  link: Link;
  index: number;
  onUpdate: (link: Link) => void;
  onRemove: (id: string) => void;
}

const LinkItem = ({ link, index, onUpdate, onRemove }: LinkItemProps) => {
  const [platform, setPlatform] = useState(link.platform);
  const [url, setUrl] = useState(link.url);

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlatform(e.target.value);
    onUpdate({ ...link, platform: e.target.value });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    onUpdate({ ...link, url: e.target.value });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Link #{index}</h3>
        <button
          onClick={() => onRemove(link.id)}
          className="text-gray-500 hover:text-red-500"
        >
          Remove
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Platform
        </label>
        <select
          value={platform}
          onChange={handlePlatformChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a platform</option>
          <option value="GitHub">GitHub</option>
          <option value="YouTube">YouTube</option>
          <option value="LinkedIn">LinkedIn</option>
          {/* Add more platform options as needed */}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Link
        </label>
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://www.example.com/username"
          className="w-full p-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default LinkItem;

// import { Draggable, DraggableProvided } from "react-beautiful-dnd";
// import { Link } from "../types";

// interface LinkItemProps {
//   link: Link;
//   index: number;
//   onEdit: (link: Link) => void;
//   onDelete: (id: string) => void;
// }

// const LinkItem = ({ link, index, onEdit, onDelete }: LinkItemProps) => {
//   return (
//     <Draggable draggableId={link.id} index={index}>
//       {(provided: DraggableProvided) => (
//         <div
//           ref={provided.innerRef}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           className="bg-white p-4 mb-2 rounded shadow flex justify-between items-center"
//         >
//           <span>
//             {link.platform}: {link.url}
//           </span>
//           <div>
//             <button onClick={() => onEdit(link)} className="text-blue-600 mr-2">
//               Edit
//             </button>
//             <button onClick={() => onDelete(link.id)} className="text-red-600">
//               Delete
//             </button>
//           </div>
//         </div>
//       )}
//     </Draggable>
//   );
// };

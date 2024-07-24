import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import LinkItem from "./LinkItem";
import { Link } from "../types";

interface LinkListProps {
  links: Link[];
  setLinks: (links: Link[]) => void;
  onEditLink: (link: Link) => void;
  onDeleteLink: (id: string) => void;
}

const LinkList = ({
  links,
  setLinks,
  onEditLink,
  onDeleteLink,
}: LinkListProps) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedLinks = Array.from(links);
    const [movedLink] = reorderedLinks.splice(result.source.index, 1);
    reorderedLinks.splice(result.destination.index, 0, movedLink);
    setLinks(reorderedLinks);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {links.map((link, index) => (
              <LinkItem
                key={link.id}
                link={link}
                index={index}
                onEdit={onEditLink}
                onDelete={onDeleteLink}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

// import {
//   DragDropContext,
//   Droppable,
//   Draggable,
//   DropResult,
//   DraggableProvided,
//   DraggableStateSnapshot,
// } from "react-beautiful-dnd";
// import LinkItem from "./LinkItem";

// interface LinkListProps {
//   links: { id: string; url: string }[];
//   setLinks: (links: { id: string; url: string }[]) => void;
// }

// const LinkList = ({ links, setLinks }: LinkListProps) => {
//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;
//     const reorderedLinks = Array.from(links);
//     const [movedLink] = reorderedLinks.splice(result.source.index, 1);
//     reorderedLinks.splice(result.destination.index, 0, movedLink);
//     setLinks(reorderedLinks);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="links">
//         {(provided) => (
//           <div {...provided.droppableProps} ref={provided.innerRef}>
//             {links.map((link, index) => (
//               <Draggable key={link.id} draggableId={link.id} index={index}>
//                 {(
//                   provided: DraggableProvided,
//                   snapshot: DraggableStateSnapshot
//                 ) => <LinkItem link={link} provided={provided} />}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </div>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// };

export default LinkList;

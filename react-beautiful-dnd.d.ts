declare module "react-beautiful-dnd" {
  import * as React from "react";

  export interface DraggableProvided {
    innerRef: React.Ref<any>;
    draggableProps: React.HTMLProps<HTMLDivElement>;
    dragHandleProps?: React.HTMLProps<HTMLDivElement>;
  }

  export interface DraggableStateSnapshot {
    isDragging: boolean;
    isDropAnimating: boolean;
  }

  export const DragDropContext: React.FC<{
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }>;

  export const Droppable: React.FC<{
    droppableId: string;
    children: (
      provided: DroppableProvided,
      snapshot: DroppableStateSnapshot
    ) => React.ReactNode;
  }>;

  export const Draggable: React.FC<{
    draggableId: string;
    index: number;
    children: (
      provided: DraggableProvided,
      snapshot: DraggableStateSnapshot
    ) => React.ReactNode;
  }>;

  export interface DropResult {
    draggableId: string;
    type: string;
    source: {
      index: number;
      droppableId: string;
    };
    destination?: {
      index: number;
      droppableId: string;
    };
    reason: "DROP" | "CANCEL";
  }

  export interface DroppableProvided {
    innerRef: React.Ref<any>;
    droppableProps: React.HTMLProps<HTMLDivElement>;
    placeholder: React.ReactElement;
  }

  export interface DroppableStateSnapshot {
    isDraggingOver: boolean;
    draggingOverWith: string | null;
  }
}

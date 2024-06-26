"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import RadixIconsDragHandleDots2 from "@/public/icons/RadixIconsDragHandleDots2";
import { useDraggable } from "@dnd-kit/core";
import handleNoteContentChange from "@/actions/notesManagement/updateNote";
import { NoteData } from "../page";
import handleNoteDelete from "@/actions/notesManagement/handleNoteDelete";
import TipTapEditor from "./TipTapEditor";
import { socket } from "@/socket";
import { Tooltip } from "react-tooltip";
import ClientIcon from "../../(home)/_components/ClientIcon";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";

const NoteSize = {
  width: "140px",
  minHeight: "140px",
};

export interface currentUserType {
  username: string;
  profile_image: string | null;
}

export function Note({
  note,
  styles,
  currentUser,
}: {
  note: NoteData;
  styles?: React.CSSProperties;
  currentUser: currentUserType;
}) {
  const {
    id,
    server_id,
    author,
    documentName,
    content,
    positionX,
    positionY,
    authorUser,
  } = note;

  const isCurrentUserAuthor = author === currentUser.username;

  const [currentContent, setCurrentContent] = useState(content);

  useEffect(() => {
    // Update current content when the note content changes
    setCurrentContent(content);
  }, [content]);

  const handleContentChange = useCallback(
    async (newContent: string) => {
      try {
        await handleNoteContentChange(id, newContent);
        setCurrentContent(newContent); // Update current content locally
        socket.emit("update-note", {
          note: {
            ...note,
            content: newContent,
          },
          serverId: server_id,
        });
      } catch (error) {
        console.error("Error updating note content:", error);
      }
    },
    [id, note, server_id],
  );

  const handleNoteDeletion = useCallback(async () => {
    try {
      await handleNoteDelete(id, server_id);
      setIsDeleted(true);
      setTimeout(() => {
        socket.emit("delete-note", {
          noteId: id,
          serverId: server_id,
        }); // Notify server and other clients
      }, 300);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }, [id, server_id]);

  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id,
  });
  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);

  useEffect(() => {
    if (isNewNote) {
      setIsNewNote(false);
    }
  }, [isNewNote]);

  useEffect(() => {
    if (!transform) return;
    const newPositionX = positionX + transform.x;
    const newPositionY = positionY + transform.y;
    // Ensure that the update only happens if there's an actual change in position
  }, [transform, positionX, positionY]);

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    ...NoteSize,
    ...styles,
    opacity: isDeleted || isNewNote ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div
      className={`flex flex-col border border-black50 bg-primary p-1 shadow-xl`}
      style={style}
      ref={setNodeRef}
    >
      <div className="mb-2 flex">
        <div className="me-2 flex h-8 w-8 justify-start">
          {authorUser && authorUser.profile_image ? (
            <ClientIcon
              filename={authorUser.profile_image}
              alt="profile image"
            />
          ) : (
            <MaterialSymbolsProfile width={30} height={30} />
          )}
        </div>

        <p className="flex items-center text-center text-sm">
          {authorUser ? authorUser.username : "Unknown user"}
        </p>
      </div>
      <Tooltip id="delete-note-tooltip" />
      {isCurrentUserAuthor && (
        <div className="pointer-events-auto absolute right-1 top-0 justify-end transition-transform hover:rotate-90">
          <a
            data-tooltip-id="delete-note-tooltip"
            data-tooltip-content="Delete"
            data-tooltip-place="right"
          >
            <button onClick={handleNoteDeletion}>x</button>
          </a>
        </div>
      )}

      <div className="flex-grow">
        <TipTapEditor
          documentName={documentName}
          initialContent={currentContent}
          onContentChange={handleContentChange}
          disabled={!isCurrentUserAuthor}
        />
      </div>
      <Tooltip id="move-note-tooltip" />
      {isCurrentUserAuthor && (
        <a
          data-tooltip-id="move-note-tooltip"
          data-tooltip-content="Drag"
          data-tooltip-place="bottom"
        >
          <button className="my-1 h-4 w-full" {...listeners} {...attributes}>
            <RadixIconsDragHandleDots2 className="mx-auto h-5 w-5" />
          </button>
        </a>
      )}
    </div>
  );
}

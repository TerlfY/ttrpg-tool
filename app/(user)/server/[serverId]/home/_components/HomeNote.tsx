import TipTapEditor from "../../notes/_components/TipTapEditor";
import { NoteData } from "../../notes/page";
import { currentUserType } from "../../notes/_components/note";
import { useCallback, useEffect, useState } from "react";
import handleNoteContentChange from "@/actions/notesManagement/updateNote";
import { socket } from "@/socket";
import MaterialSymbolsProfile from "@/public/icons/MaterialSymbolsProfile";
import ClientIcon from "./ClientIcon";

const NoteSize = {
  width: "140px",
  minHeight: "140px",
};

export default function HomeNote({
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

  const [isDeleted, setIsDeleted] = useState(false);
  const [isNewNote, setIsNewNote] = useState(true);

  useEffect(() => {
    if (isNewNote) {
      setIsNewNote(false);
    }
  }, [isNewNote]);

  const style: React.CSSProperties = {
    opacity: isDeleted || isNewNote ? 0 : 1,
    transition: "opacity 0.3s ease-in-out",
  };

  return (
    <div
      className={`flex h-[140px] w-[140px] flex-col border border-black50 bg-primary p-1 shadow-xl`}
      style={style}
    >
      <div className="mb-2 flex">
        <div className="me-2 flex h-8 w-8 justify-start">
          {authorUser.profile_image ? (
            <ClientIcon
              filename={authorUser.profile_image}
              alt="profile image"
            />
          ) : (
            <MaterialSymbolsProfile width={30} height={30} />
          )}
        </div>

        <p className="flex items-center text-center text-sm">
          {authorUser.username}
        </p>
      </div>

      <div className="scrollbar-thin overflow-auto">
        <TipTapEditor
          documentName={documentName}
          initialContent={currentContent}
          onContentChange={handleContentChange}
          disabled={!isCurrentUserAuthor}
        />
      </div>
    </div>
  );
}

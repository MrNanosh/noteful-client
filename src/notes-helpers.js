export const findFolder = (
  folders = [],
  folderId
) =>
  folders.find(
    folder =>
      folder.id === Number(folderId)
  );

export const findNote = (
  notes = [],
  noteId
) =>
  notes.find(
    note => note.id === Number(noteId)
  );

export const getNotesForFolder = (
  notes = [],
  folder_id
) =>
  !folder_id
    ? notes
    : notes.filter(
        note =>
          note.folder_id ===
          Number(folder_id)
      );

export const countNotesForFolder = (
  notes = [],
  folderId
) =>
  notes.filter(
    note =>
      note.folder_id ===
      Number(folderId)
  ).length;

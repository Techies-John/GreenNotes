const params = new URLSearchParams(window.location.search);
const noteId = params.get("id");

async function fetchNote(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/get-note/${id}`);
    if (!res.ok) throw new Error("Note not found");
    return await res.json();
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
}

let editState = false;
const titleInput = document.querySelector('input[name="noteName"]');
const descTextarea = document.querySelector('textarea[name="noteDescription"]');
const button = document.querySelector("#edit-button");
titleInput.setAttribute("readonly", true);
descTextarea.setAttribute("readonly", true);

function toggleEdit() {
  editState = !editState;

  if (editState) {
    // Enable editing
    titleInput.removeAttribute("readonly");
    descTextarea.removeAttribute("readonly");
    button.textContent = "Done";
    titleInput.focus();
  } else {
    // Disable editing
    titleInput.setAttribute("readonly", true);
    descTextarea.setAttribute("readonly", true);
    button.textContent = "Edit";

    const updatedNote = {
      note_title: titleInput.value.trim(),
      description: descTextarea.value.trim(),
    };

    // Validate inputs before prompting save
    if (!updatedNote.note_title || !updatedNote.description) {
      Swal.fire("Oops!", "Both fields are required.", "warning");
      // Keep fields editable until user corrects them
      editState = true;
      titleInput.removeAttribute("readonly");
      descTextarea.removeAttribute("readonly");
      button.textContent = "Done";
      return;
    }

    // Ask user to confirm save
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/put-note/${noteId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedNote),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Update failed");
            Swal.fire("Saved!", "Your note has been updated.", "success");
          })
          .catch((err) => {
            console.error("Update error:", err.message);
            Swal.fire("Error", "Failed to update the note.", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("No worries!", "Changes were not saved.", "info");
        // Optional: reload original data if you want to discard edits visually
        fetchNote(noteId).then((note) => {
          if (!note) return;
          titleInput.value = note.note_title;
          descTextarea.value = note.description;
        });
      }
    });
  }
}

// Populate form fields
fetchNote(noteId).then((note) => {
  if (!note) return;

  document.querySelector('input[name="noteName"]').value = note.note_title;
  document.querySelector('textarea[name="noteDescription"]').value =
    note.description;
});

document.getElementById("note-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedNote = {
    note_title: document.querySelector('input[name="noteName"]').value,
    description: document.querySelector('textarea[name="noteDescription"]')
      .value,
  };

  try {
    const res = await fetch(`http://localhost:3000/api/put-note/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });

    if (!res.ok) throw new Error("Update failed");

    alert("Note updated successfully!");
    window.location.href = " /index.html";
  } catch (err) {
    console.error("Update error:", err.message);
    alert("Failed to update the note.");
  }
});

function handleDelete() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`http://localhost:3000/api/delete-note/${noteId}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (!res.ok) throw new Error("Deletion failed");
          Swal.fire({
            title: "Deleted!",
            text: "Your note has been deleted.",
            icon: "success",
          }).then(() => {
            window.location.href = " /index.html";
          });
        })
        .catch((err) => {
          console.error("Delete error:", err.message);
          Swal.fire("Error", "Failed to delete the note.", "error");
        });
    }
  });
}

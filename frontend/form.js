document.getElementById("note-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Prevent default form submission behavior

  const noteName = document.querySelector('input[name="noteName"]').value;
  const noteDescription = document.querySelector(
    'textarea[name="noteDescription"]'
  ).value;

  try {
    const res = await fetch("http://localhost:3000/api/add-note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteName, noteDescription }),
    });

    if (!res.ok) throw new Error("Failed to add note");

    // Show SweetAlert2 success modal
    Swal.fire({
      title: "Note added!",
      text: "Your note was saved successfully.",
      icon: "success",
      confirmButtonText: "Cool",
    }).then(() => {
      window.location.href = " /index.html";
    });
  } catch (err) {
    console.error("Error:", err.message);
    alert("Error adding note.");
  }
});

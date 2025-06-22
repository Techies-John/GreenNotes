// descriptions
const maxDescriptionLength = 200;
const container = document.getElementById("card-grid");
const params = new URLSearchParams(window.location.search);

async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/get-notes");
    if (!response.ok) throw new Error("Server responded with an error");

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

fetchData().then((notes) => {
  if (!notes || notes.length === 0) {
    //notes is empty
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2 class="card-title">Hello from Green notes</h2>
      <p class="card-description">Please click Add Note button at top right to add more notes!</p>
  `;
    container.appendChild(card);

    return;
  }
  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "card";

    const shortDesc =
      note.description.length > maxDescriptionLength
        ? note.description.slice(0, maxDescriptionLength) + "..."
        : note.description;

    card.innerHTML = `
    <h2 class="card-title">${note.note_title}</h2>
    <p class="card-description">${shortDesc}</p>
    <a id="card-button" class="card-button" href="note.html?id=${note.id}">View note</a>
  `;
    container.appendChild(card);
  });
});

if (params.get("status") === "success") {
  alert("Note added successfully 💚");
}

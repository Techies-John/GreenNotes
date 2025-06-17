async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/api/get-note");
    if (!response.ok) throw new Error("Server responded with an error");

    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Fetch failed:", err.message);
  }
}

const container = document.getElementById("card-grid");

fetchData().then((notes) => {
  notes.forEach((note) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2 class="card-title">${note.note_title}</h2>
      <p class="card-description">${note.description}</p>
      <button class="card-button" data-id="${note.id}">View note</button>
    `;
    container.appendChild(card);
  });
});

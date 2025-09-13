export function initBooks() {
  const addBtn = document.getElementById("addBookBtn");
  const formContainer = document.getElementById("formContainer");
  const form = document.getElementById("bookForm");
  const table = document.getElementById("booksTable");

  // Show/hide form when "Add Book" is clicked
  addBtn.addEventListener("click", () => {
    formContainer.style.display = 
      formContainer.style.display === "none" ? "block" : "none";
  });

  // Load saved books from localStorage
  let books = JSON.parse(localStorage.getItem("books")) || [];
  renderTable();

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;

    books.push({ title, author });

    localStorage.setItem("books", JSON.stringify(books));

    renderTable();
    form.reset();
    formContainer.style.display = "none"; // hide form after submit
  });

  function renderTable() {
    table.innerHTML = "";
    books.forEach((book) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${book.title}</td><td>${book.author}</td>`;
      table.appendChild(row);
    });
  }
}

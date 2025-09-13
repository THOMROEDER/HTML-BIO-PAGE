const menuItems = document.querySelectorAll('li');
const content = document.getElementById('content');

//add click events to each menu item

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        const view = item.dataset.view; //which menu item
        updateContent(view);
    });
});

//function to update content area

function updateContent(view) {
  let file = '';
  if (view === 'aboutme') file = 'views/about.html';
  if (view === 'books') file = 'views/books.html';

  fetch(file)
    .then(response => response.text())
    .then(html => {
      content.innerHTML = html;

      // Optionally initialize scripts for that view
      if (view === 'books') {
        import('./scripts/books.js').then(module => {
          module.initBooks();
        });
      }
    });
}

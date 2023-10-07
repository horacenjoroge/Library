document.addEventListener('DOMContentLoaded', () => {
    // Book constructor function
    function Book(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    // Library array to store books
    const library = [];

    // Function to add a new book
    function addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        library.push(newBook);
    }

    // Function to toggle the read status of a book
    Book.prototype.toggleReadStatus = function () {
        this.read = !this.read;
    };

    // Function to display books in the library
    function displayBooks() {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        library.forEach((book, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author}, ${book.pages} pages, ${book.read ? 'read' : 'not read'
                }`;

            // Add a button to toggle read status
            const toggleButton = document.createElement('button');
            toggleButton.textContent = 'Toggle Read Status';
            toggleButton.addEventListener('click', () => {
                book.toggleReadStatus();
                displayBooks(); // Update the display after toggling
            });

            // Add a button to delete the book
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                library.splice(index, 1);
                displayBooks(); // Update the display after deleting
            });

            listItem.appendChild(toggleButton);
            listItem.appendChild(deleteButton);
            bookList.appendChild(listItem);
        });
    }

    // Event listener for showing books
    document.getElementById('view-books-btn').addEventListener('click', () => {
        const booksDiv = document.querySelector('.book-container');
        if (booksDiv.style.display === 'none' || booksDiv.style.display === '') {
            booksDiv.style.display = 'block';
            displayBooks();
        } else {
            booksDiv.style.display = 'none';
        }
    });

    // Event listener for showing the add book form
    document.getElementById('add-book-btn').addEventListener('click', () => {
        const addBookForm = document.querySelector('.add-book-form');
        if (addBookForm.style.display === 'none' || addBookForm.style.display === '') {
            addBookForm.style.display = 'block';
        } else {
            addBookForm.style.display = 'none';
        }
    });

    // Parse the number of pages as an integer
    const pages = parseInt(document.getElementById('pages').value, 10);

    const read = document.getElementById('read').checked;

    // Check if pages is a valid positive integer
    if ( pages <= 0) {
        alert("Please enter a valid number of pages.");
        return; // Stop processing if the input is invalid
    }
    // Event listener for adding a new book
    document.getElementById('book-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;
        addBookToLibrary(title, author, pages, read);
        displayBooks();
        document.getElementById('book-form').reset(); // Reset the form
    });
});
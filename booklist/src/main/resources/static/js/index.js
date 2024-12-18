class Book {
    constructor(title, author, isbn, year){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.year = year;
    }
}

class UI {
    static async DisplayBooks() {
        const books = await Store.getBooks();
        console.log("display:", books);
        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td>${book.year}</td>
            <td>${book.id}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row); 
    
    }
    static deleteBook(e){
        if(e.classList.contains('delete')){
            e.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
        document.querySelector('#year').value = '';


    }
}
class Store {
    static async getBooks() {
        try {
            const response = await fetch('http://localhost:8089/api/books');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const listOfBooks = await response.json();
            console.log(listOfBooks);
            return listOfBooks;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error; // You may want to handle or propagate the error based on your requirements
        }
    }

    static async addBook(book) {
        try {
            // Make a POST request to the server
            const response = await fetch('http://localhost:8089/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Assuming the server responds with the added book data
            const addedBook = await response.json();
            UI.showAlert('Book added successfully:', "success");
        } catch (error) {
            console.error('Error adding book:', error);
            throw error; // You may want to handle or propagate the error based on your requirements
        }
    }


    static async removeBook(id){
        try {
            // Make a DELETE request to the server
            const response = await fetch(`http://localhost:8089/api/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            UI.showAlert('Book deleted successfully:', "success");
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error; // You may want to handle or propagate the error based on your requirements
        }
    }
}
document.addEventListener('DOMContentLoaded', UI.DisplayBooks);
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    const year = document.querySelector('#year').value;
    // Validate
    if(title === '' || author === '' || isbn === '' || year === ''){
        UI.showAlert("Please fill in all fields", "danger");
    }else {
        const book = new Book(title, author, isbn, year);
        Store.addBook(book);
        UI.clearFields();
    }
}); 
 document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
 })

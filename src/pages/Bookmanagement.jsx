import { useState, useEffect } from "react";

function Bookmanagement() {

    const [books, setBooks] = useState([]);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [isbn, setIsbn] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(function() {

        const savedBooks =
            JSON.parse(localStorage.getItem("books")) || [];

        if (savedBooks.length === 0) {

            const startingBooks = [
                {
                    title: "Mopheme",
                    author: "Sebolai Matlosa",
                    genre: "Sesotho",
                    isbn: "0201",
                    quantity: 4
                },
                {
                    title: "Chaka",
                    author: "Thomas Mofolo",
                    genre: "Historical",
                    isbn: "0202",
                    quantity: 2
                },
                {
                    title: "Lithoko tsa Marena a Basotho",
                    author: "Z.D. Mangoela",
                    genre: "Poetry",
                    isbn: "0203",
                    quantity: 20
                },
                {
                    title: "Business Accounting",
                    author: "Frank Wood",
                    genre: "Accounting",
                    isbn: "0204",
                    quantity: 4
                },
                {
                    title: "Financial Accounting",
                    author: "Jerry J. Teko",
                    genre: "Accounting",
                    isbn: "0205",
                    quantity: 5
                },
                {
                    title: "A Brief History of Time",
                    author: "Stephen Hawking",
                    genre: "Science/Physics",
                    isbn: "0206",
                    quantity: 5
                },
                {
                    title: "The Selfish Gene",
                    author: "Richard Dawkins",
                    genre: "Biology",
                    isbn: "0207",
                    quantity: 1
                },
                {
                    title: "Silent Spring",
                    author: "Rachel Carson",
                    genre: "Environmental Science",
                    isbn: "0208",
                    quantity: 3
                },
                {
                    title: "The Lean Startup",
                    author: "Eric Ries",
                    genre: "Business/Entrepreneurship",
                    isbn: "0209",
                    quantity: 4
                },
                {
                    title: "Good to Great",
                    author: "Jim Collins",
                    genre: "Business Management",
                    isbn: "0210",
                    quantity: 10
                },
                {
                    title: "The E-Myth Revisited",
                    author: "Michael E. Gerber",
                    genre: "Entrepreneurship",
                    isbn: "0211",
                    quantity: 20
                },
                {
                    title: "The Psychology of Money",
                    author: "Morgan Housel",
                    genre: "Personal Finance",
                    isbn: "0212",
                    quantity: 35
                },
                {
                    title: "Your Money Your Life",
                    author: "Vicki Robin",
                    genre: "Personal Finance",
                    isbn: "0213",
                    quantity: 4
                },
                {
                    title: "The Intelligent Investor",
                    author: "Benjamin Graham",
                    genre: "Investing",
                    isbn: "0214",
                    quantity: 1
                }
            ];

            setBooks(startingBooks);

            localStorage.setItem(
                "books",
                JSON.stringify(startingBooks)
            );

        } else {

            setBooks(savedBooks);

        }

    }, []);


    function handleSubmit(event) {

        event.preventDefault();

        if (
            title.trim() === "" ||
            author.trim() === "" ||
            genre.trim() === "" ||
            isbn.trim() === "" ||
            quantity === ""
        ) {

            alert("Please fill in all fields.");

            return;
        }

        if (Number(quantity) < 0) {

            alert("Quantity cannot be negative.");

            return;
        }

        const newBook = {

            title: title.trim(),

            author: author.trim(),

            genre: genre.trim(),

            isbn: isbn.trim(),

            quantity: Number(quantity)

        };

        const updatedBooks = [...books, newBook];

        setBooks(updatedBooks);

        localStorage.setItem(
            "books",
            JSON.stringify(updatedBooks)
        );

        setTitle("");
        setAuthor("");
        setGenre("");
        setIsbn("");
        setQuantity("");

        alert("Book added successfully.");

    }


    function updateBook(index) {

        const newTitle = prompt(
            "Enter new title:",
            books[index].title
        );

        if (newTitle === null) {
            return;
        }

        const newAuthor = prompt(
            "Enter new author:",
            books[index].author
        );

        if (newAuthor === null) {
            return;
        }

        const newGenre = prompt(
            "Enter new genre:",
            books[index].genre
        );

        if (newGenre === null) {
            return;
        }

        const newISBN = prompt(
            "Enter new ISBN:",
            books[index].isbn
        );

        if (newISBN === null) {
            return;
        }

        const newQuantity = prompt(
            "Enter new quantity:",
            books[index].quantity
        );

        if (newQuantity === null) {
            return;
        }

        if (Number(newQuantity) < 0) {

            alert("Quantity cannot be negative.");

            return;
        }

        const updatedBooks = [...books];

        updatedBooks[index] = {

            title: newTitle.trim(),

            author: newAuthor.trim(),

            genre: newGenre.trim(),

            isbn: newISBN.trim(),

            quantity: Number(newQuantity)

        };

        setBooks(updatedBooks);

        localStorage.setItem(
            "books",
            JSON.stringify(updatedBooks)
        );

    }


    function deleteBook(index) {

        const confirmation = confirm(
            "Are you sure you want to delete this book?"
        );

        if (confirmation) {

            const updatedBooks = books.filter(
                function(book, bookIndex) {
                    return bookIndex !== index;
                }
            );

            setBooks(updatedBooks);

            localStorage.setItem(
                "books",
                JSON.stringify(updatedBooks)
            );

        }

    }


    return (
        <div>

            <h2>Book Management</h2>

            <form onSubmit={handleSubmit}>

                <label>Title</label>

                <input
                    type="text"
                    value={title}
                    onChange={function(event) {
                        setTitle(event.target.value);
                    }}
                />

                <label>Author</label>

                <input
                    type="text"
                    value={author}
                    onChange={function(event) {
                        setAuthor(event.target.value);
                    }}
                />

                <label>Genre</label>

                <input
                    type="text"
                    value={genre}
                    onChange={function(event) {
                        setGenre(event.target.value);
                    }}
                />

                <label>ISBN</label>

                <input
                    type="text"
                    value={isbn}
                    onChange={function(event) {
                        setIsbn(event.target.value);
                    }}
                />

                <label>Initial Quantity</label>

                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={function(event) {
                        setQuantity(event.target.value);
                    }}
                />

                <button type="submit">
                    Add Book
                </button>

            </form>


            <h2>Book List</h2>

            <table>

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Author</th>

                        <th>Genre</th>

                        <th>ISBN</th>

                        <th>Quantity</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {books.map(function(book, index) {

                        return (

                            <tr key={index}>

                                <td>{book.title}</td>

                                <td>{book.author}</td>

                                <td>{book.genre}</td>

                                <td>{book.isbn}</td>

                                <td>{book.quantity}</td>

                                <td>

                                    <button
                                        type="button"
                                        onClick={function() {
                                            updateBook(index);
                                        }}
                                    >
                                        Update
                                    </button>

                                    <button
                                        type="button"
                                        onClick={function() {
                                            deleteBook(index);
                                        }}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}

export default Bookmanagement;
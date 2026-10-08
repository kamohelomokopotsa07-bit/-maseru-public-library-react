import { useState, useEffect } from "react";

function Dashboard() {

    const [books, setBooks] = useState([]);

    useEffect(function() {

        const savedBooks =
            JSON.parse(localStorage.getItem("books")) || [];

        setBooks(savedBooks);

    }, []);

    return (
        <div>

            <h2>Book Availability</h2>

            <table>

                <thead>

                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Quantity</th>
                    </tr>

                </thead>

                <tbody>

                    {books.map(function(book, index) {

                        return (
                            <tr
                                key={index}
                                className={
                                    Number(book.quantity) < 2
                                        ? "low-stock"
                                        : ""
                                }
                            >

                                <td>{book.title}</td>

                                <td>{book.author}</td>

                                <td>{book.genre}</td>

                                <td>{book.isbn}</td>

                                <td>

                                    {Number(book.quantity) < 2 && (
                                        <span className="low-stock-bulb"></span>
                                    )}

                                    {book.quantity}

                                    {Number(book.quantity) === 1
                                        ? " copy"
                                        : " copies"
                                    }

                                </td>

                            </tr>
                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}

export default Dashboard;
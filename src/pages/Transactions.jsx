import { useState, useEffect } from "react";

function Transactions() {

    const [books, setBooks] = useState([]);
    const [transactions, setTransactions] = useState([]);

    const [selectedBook, setSelectedBook] = useState("");
    const [transactionType, setTransactionType] = useState("add");
    const [quantity, setQuantity] = useState("");


    // Load books and transactions from Local Storage
    useEffect(function() {

        const savedBooks =
            JSON.parse(localStorage.getItem("books")) || [];

        const savedTransactions =
            JSON.parse(localStorage.getItem("transactions")) || [];

        setBooks(savedBooks);
        setTransactions(savedTransactions);

    }, []);


    // Handle transaction
    function handleTransaction(event) {

        event.preventDefault();

        if (selectedBook === "") {

            alert("Please select a book.");

            return;
        }

        if (quantity === "" || Number(quantity) <= 0) {

            alert("Please enter a valid quantity.");

            return;
        }


        const bookIndex = Number(selectedBook);

        const amount = Number(quantity);

        const updatedBooks = [...books];

        const book = updatedBooks[bookIndex];


        // Add stock
        if (transactionType === "add") {

            book.quantity =
                Number(book.quantity) + amount;

        }


        // Deduct stock
        else {

            if (Number(book.quantity) < amount) {

                alert("Not enough copies available.");

                return;
            }

            book.quantity =
                Number(book.quantity) - amount;
        }


        // Save updated books
        setBooks(updatedBooks);

        localStorage.setItem(
            "books",
            JSON.stringify(updatedBooks)
        );


        // Create transaction record
        const newTransaction = {

            book: book.title,

            type:
                transactionType === "add"
                    ? "Stock Added"
                    : "Borrowed",

            quantity: amount,

            date: new Date().toLocaleDateString()

        };


        const updatedTransactions = [
            ...transactions,
            newTransaction
        ];


        // Save transaction history
        setTransactions(updatedTransactions);

        localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
        );


        // Clear form
        setSelectedBook("");
        setTransactionType("add");
        setQuantity("");


        alert("Transaction completed successfully.");

    }


    return (
        <div>

            <h2>Book Transactions</h2>


            <form onSubmit={handleTransaction}>

                <label>Select Book</label>

                <select
                    value={selectedBook}
                    onChange={function(event) {
                        setSelectedBook(event.target.value);
                    }}
                >

                    <option value="">
                        Select a book
                    </option>

                    {books.map(function(book, index) {

                        return (
                            <option
                                key={index}
                                value={index}
                            >
                                {book.title}
                            </option>
                        );

                    })}

                </select>


                <label>Transaction Type</label>

                <select
                    value={transactionType}
                    onChange={function(event) {
                        setTransactionType(event.target.value);
                    }}
                >

                    <option value="add">
                        Add Stock
                    </option>

                    <option value="deduct">
                        Deduct Stock
                    </option>

                </select>


                <label>Quantity</label>

                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={function(event) {
                        setQuantity(event.target.value);
                    }}
                />


                <button type="submit">
                    Submit Transaction
                </button>

            </form>


            <h2>Transaction History</h2>


            <table>

                <thead>

                    <tr>

                        <th>Book</th>

                        <th>Transaction</th>

                        <th>Quantity</th>

                        <th>Date</th>

                    </tr>

                </thead>


                <tbody>

                    {transactions.map(function(
                        transaction,
                        index
                    ) {

                        return (

                            <tr key={index}>

                                <td>
                                    {transaction.book}
                                </td>

                                <td>
                                    {transaction.type}
                                </td>

                                <td>
                                    {transaction.quantity}
                                </td>

                                <td>
                                    {transaction.date}
                                </td>

                            </tr>

                        );

                    })}

                </tbody>

            </table>

        </div>
    );
}

export default Transactions;
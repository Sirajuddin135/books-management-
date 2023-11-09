import React, { useState } from "react";
import './addBook.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const apiUrl = "https://library-management-software-0pdb.onrender.com/api";

function AddBook() {
    const [book, setBook] = useState({
        title: '',
        author: '',
        summary: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${apiUrl}/books`, book)
            .then(response => {
                toast.success("Book details added successfully.")

                setBook({
                    title: '',
                    author: '',
                    summary: '',
                });

                window.location.href = '/home'
            })
            .catch(error => {
                toast.error("Book details addition failed.")
            });
    };

    return (
        <div className="add-book">
            <h2 className="section-heading">Book Details</h2>
            <form onSubmit={handleSubmit}>
                <section>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={handleChange}
                    />
                    <label>Author:</label>
                    <input
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={handleChange}
                    />
                    <label>Summary:</label>
                    <textarea
                        name="summary"
                        value={book.summary}
                        onChange={handleChange}
                    />
                </section>
                <button className="btn" type="submit">Add Book</button>
            </form>
            <ToastContainer position='bottom-right' />
        </div>
    );
}

export default AddBook;

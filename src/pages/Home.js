import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import UpdateBook from './UpdateBook';
import ViewBook from './ViewBook';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';

const apiUrl = "https://library-management-software-0pdb.onrender.com/api";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [bookId, setBookId] = useState(null);
    const [book, setBook] = useState({});

    useEffect(() => {
        getBooks();
    }, []);

    const handleShowUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleHideUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleShowViewModal = () => {
        setShowViewModal(true);
    };

    const handleHideViewModal = () => {
        setShowViewModal(false);
    };

    const getBooks = async () => {
        await axios.get(`${apiUrl}/books`)
            .then(response => {
                const b = response.data.books;
                b.length > 0 ? setBooks(b) : setBooks([]);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    const getBook = async (bookId) => {
        await axios.get(`${apiUrl}/books/${bookId}`)
            .then(response => {
                setBook(response.data.book);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    const handleView = async (bookId) => {
        setBookId(bookId);
        await getBook(bookId);
        handleShowViewModal();
        console.log('View book:', bookId);
    };

    const handleUpdate = async (bookId) => {
        setBookId(bookId);
        await getBook(bookId);
        handleShowUpdateModal();
        console.log('Update book:', book);
    };

    const handleDelete = (bookId) => {
        axios.delete(`${apiUrl}/books/${bookId}`)
            .then(response => {
                getBooks();
                toast.success("Book details deleted successfully.")
            })
            .catch(error => {
                toast.error("Book deletion process failed.")
            });
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = '/login';
    }

    return (
        <div>
            <h1 className='books-heading'>Books</h1>
            <div className='books'>
                {books && books.length > 0 ? (
                    books.map(book => (
                        <div className="book-item" key={book._id}>
                            <h2>{book.title}</h2>
                            <div className="options">
                                <EyeOutlined onClick={() => handleView(book._id)} />
                                <EditOutlined onClick={() => handleUpdate(book._id)} />
                                <DeleteOutlined onClick={() => handleDelete(book._id)} />
                            </div>
                        </div>

                    ))) : <p>No books added.</p>
                }
            </div>

            <button className='logout' onClick={logout}>Logout</button>

            <ToastContainer position="bottom-right" />
            {showUpdateModal && <UpdateBook onHide={handleHideUpdateModal} bookId={bookId} book={book} />}
            {showViewModal && <ViewBook onHide={handleHideViewModal} bookId={bookId} book={book} />}
        </div>
    );
};

export default Home;

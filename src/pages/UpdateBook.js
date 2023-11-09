
import axios from 'axios';
import { useState } from 'react';
import { Button, Form, Modal, ToastContainer } from 'react-bootstrap';
import { toast } from 'react-toastify';

const apiUrl = "https://library-management-software-0pdb.onrender.com/api";

const UpdateBook = (props) => {
    const [book, setBook] = useState({
        title: props.book.title,
        author: props.book.author,
        summary: props.book.summary,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBook((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`${apiUrl}/books/${props.bookId}`, book)
            .then((res) => {
                toast.success('Book details updated successfully.');
                props.onHide();
                window.location.href = '/home';
            })
            .catch((error) => {
                toast.error('Book details updation failed.');
            });
    };

    return (
        <Modal show={true} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Book Details</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={book.title}
                            placeholder="Enter book title"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            name="author"
                            value={book.author}
                            placeholder="Enter book author"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Summary</Form.Label>
                        <Form.Control
                            type="text"
                            name="summary"
                            value={book.summary}
                            placeholder="Enter book summary"
                            onChange={(e) => handleChange(e)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Details
                    </Button>
                </Modal.Body>
            </Form>
            <ToastContainer position="bottom-right" />
        </Modal>
    )
};

export default UpdateBook;

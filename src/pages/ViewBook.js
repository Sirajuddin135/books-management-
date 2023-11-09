import { useState } from 'react';
import { Modal, ToastContainer } from 'react-bootstrap';

const ViewBook = (props) => {
    const [book, setBook] = useState({
        title: props.book.title,
        author: props.book.author,
        summary: props.book.summary,
    });

    return (
        <Modal show={true} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Book Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <b>Title</b> : {book.title}
                <br />
                <b>Summary</b> : {book.summary}
                <br />
                <b>Author</b> : {book.author}
            </Modal.Body>
            <ToastContainer position='bottom-right' />
        </Modal>
    );
};

export default ViewBook;

import React from "react";
import {Modal} from 'react-bootstrap';

type Todo = {
    id : number;
    text : string;
    isChecked : boolean;
};

type TodoModalProps = {
    show : boolean;
    todo : Todo | null;
    handleClose : ()=> void;    // 함수 props로 넘겨주기 가능
}

const TodoModal : React.FC<TodoModalProps> = ({show, todo, handleClose}) => {
    return(
        <div>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Todo 상세 정보</Modal.Title>
                </Modal.Header>
                <Modal.Body>{todo?.text}</Modal.Body>
            </Modal>
        </div>
    )
}

export default TodoModal;
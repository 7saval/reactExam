import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TodoModal from "./TodoModal";

// 사용자정의 타입 지정
type Todo = {
    id : number;
    text : string;
    isChecked : boolean;
};

// React.FC : 펑션 컨포넌트 약자. props의 타입을 명시해주는 기능
// 코드를 명확하고 가독성있게 해준다.
const TodoList : React.FC = () => {
    const title : string = "오늘 할 일";
    // state는 데이터를 동적으로 감시해서 변경되면 즉시 화면 반영
    // 구조분해할당
    const [todos, setTodos] = useState<Todo[]>([
        {id : 1, text : '공부하기', isChecked : false}, 
        {id : 2, text : '잠자기', isChecked : false}, 
        {id : 3, text : '미팅하기', isChecked : false}
    ]);

    // 새 todo 넣기
    const [newTodo, setNewTodo] = useState<string>('');

    // 상세정보 보임 여부
    const [showDetail, setShowDetail] = useState<boolean>(false);
    // 선택된 todo
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const handleCheckedChange = (itemId : number) => {
        setTodos((prevItems)=>
            prevItems.map((item) => 
                item.id === itemId ? {...item, isChecked : !item.isChecked} : item
            )
        )
    }

    // todo 추가 함수
    const addTodo = () => {
        if(newTodo.trim() !== ''){
            setTodos([...todos, {id : Date.now(), text : newTodo, isChecked : false}]);
            setNewTodo(''); // 입력부 비워주기
        }
    }

    // 게시물 삭제
    const removeTodo = (id : number) => {
        setTodos(todos.filter((todo)=> todo.id !== id))
    };

    // 상세정보 보기
    const handleTodoClick = (todo : Todo) => {
        setShowDetail(true);
        setSelectedTodo(todo);
    }

    // 상세정보 창 닫기
    // const handleCloseDetail = (todo : Todo) => {
    //     setShowDetail(false);
    // }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

    return (
        <div>
            <h1>{title}</h1>
            <p></p>
            <div className="container">
                <div>
                    <input type="text" 
                        placeholder="할일 입력"
                        style={{marginRight : '10px', writingMode : 'horizontal-tb'}}
                        // value={newTodo} // 입력부 비워주기 위해 작성
                        onChange={(e)=>setNewTodo(e.target.value)}  // newTodo 데이터에 담기
                    />
                    <Button variant="warning" onClick={addTodo}>추가</Button>
                </div>
                <p></p>
                <div className="board">
                    <ul>
                        {
                            todos.map((todo, idx)=>(
                                <li key={todo.id}>
                                    <input type="checkbox" onChange={()=>{
                                        handleCheckedChange(todo.id);
                                    }} />
                                    <span onClick={()=>handleTodoClick(todo)}>
                                        {
                                            todo.isChecked ? 
                                            <del>{todo.text}</del>
                                            : <span>{todo.text}</span>
                                        } 
                                    </span>
                                    <button
                                        onClick={()=>removeTodo(todo.id)}
                                        className="delbutton"
                                    >
                                        삭제
                                    </button>
                                </li>
                            ))
                        }
                        {/* <li>{todos[0].text}</li>
                        <li>{todos[1].text}</li>
                        <li>{todos[2].text}</li> */}
                    </ul>
                </div>
            </div>
            <TodoModal show={showDetail} 
                        todo={selectedTodo} 
                        handleClose={handleCloseDetail} />
        </div>
    )
}

export default TodoList;
import React, { useState, VFC, useEffect } from "react";
import "./styles.css";
import { Box, VStack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { format } from "date-fns";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import db from "./firebase";
import { EditForm } from "./components/EditForm";
import { TodoForm } from "./components/TodoForm";
import { FilteringSelect } from "./atoms/FilteringSelect";
import { TodoTable } from "./components/TodoTable";
import { FilteredTable } from "./components/FilteredTable";
import { todosListState } from "./store/recoil/todosListState";
import { progressFilterState } from "./store/recoil/progressFilterState";
import { Todo } from "./atoms/todoType";

export const App: VFC = () => {
  const [todos, setTodos] = useRecoilState(todosListState);
  const [todo, setTodo] = useState({
    id: 0,
    title: "",
    progress: "",
    detail: "",
    createddate: "",
    updateddate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const [isfilter, setIsFilter] = useState(false);
  const [filter, setFilter] = useRecoilState(progressFilterState);

  //追加 target
  const handleAddInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    const value =
      target.name === "progress"
        ? target.selectedOptions[0].text
        : target.value;
    const name = target.name;
    setTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //追加　　配列
  const handleAddFrom = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    // if (todo !== "") {
    const add = {
      id: todos.length + 1,
      title: todo.title,
      progress: todo.progress,
      detail: todo.detail,
      createddate: format(new Date(), "yyyy年M月d日"),
      updateddate: todo.updateddate,
    };
    addDoc(collection(db, "todos"), add);
    setTodos([...todos, add]);
    // }
    setTodo({
      id: 0,
      title: "",
      progress: "",
      detail: "",
      createddate: "",
      updateddate: "",
    });
    setFilter("");
  };

  //削除
  const handleDeleteClick = async (id: unknown) => {
    const q = query(collection(db, "todos"), where("id", "==", id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((ids) => {
      const documentID = ids.id;
      deleteDoc(doc(db, "todos", documentID));

      const removeItem = todos.filter((todo) => {
        return todo.id !== id;
      });
      setTodos(removeItem);
    });
  };

  //編集
  function handleEditInputChange(e: { target: { value: any } }) {
    setCurrentTodo({
      ...currentTodo,
      title: e.target.value,
    });
  }

  function handleEditSelectedInputChange(e: {
    target: { selectedOptions: { textContent: any }[] };
  }) {
    setCurrentTodo({
      ...currentTodo,
      progress: e.target.selectedOptions[0].textContent,
    });
  }

  function handleEditDetailInputChange(e: { target: { value: any } }) {
    setCurrentTodo({
      ...currentTodo,
      detail: e.target.value,
    });
  }

  function handleEditClick(todo: React.SetStateAction<{}>) {
    setIsEditing(true);
    setCurrentTodo({ ...todo});
  }

  function handleEditFormSubmit(
    e: { preventDefault: () => void; },
    currentTodo: { id: number; }
  ) {
    // console.log(currentTodo);
    e.preventDefault();
    if (typeof currentTodo !== "undefined") {
      return handleUpdateTodo(currentTodo.id, currentTodo);
    } else {
      console.log("this type is undefined");
    }
  }

  const handleUpdateTodo = async (id: number, updatedTodo: any) => {
    const q = query(collection(db, "todos"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((ids) => {
      const documentID = ids.id;
      const docRef = doc(db, "todos", documentID);

      updateDoc(docRef, {
        ...updatedTodo,
        updateddate: serverTimestamp(),
      });

      const postData = query(collection(db, "todos"), orderBy("id"));
      getDocs(postData).then((snapShot) => {
        const updatedItem = snapShot.docs.map((doc) => ({
          id: doc.data().id,
          title: doc.data().title,
          progress: doc.data().progress,
          detail: doc.data().detail,
          createddate: doc.data().createddate,
          updateddate:
            doc.data().updateddate && typeof doc.data().updateddate === "object"
              ? format(doc.data().updateddate.toDate(), "yyyy年M月d日")
              : "",
        }));
        setTodos(updatedItem);
      });
    });
    setIsEditing(false);
  };

  function handleSelectedProgress(e: {
    target: { value: string | ((currVal: string) => string) };
  }) {
    setIsFilter(true);
    setFilter(e.target.value);
  }

  //一覧表示
  useEffect(() => {
    const postData = query(collection(db, "todos"), orderBy("id"));
    getDocs(postData).then((snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        id: doc.data().id,
        title: doc.data().title,
        progress: doc.data().progress,
        detail: doc.data().detail,
        createddate: doc.data().createddate,
        updateddate:
          doc.data().updateddate && typeof doc.data().updateddate === "object"
            ? format(doc.data().updateddate.toDate(), "yyyy年M月d日")
            : "",
      }));
      setTodos(data);
      // console.log(data);
    });
  }, [setTodos]);

  return (
    <>
      <VStack>
        {isEditing ? (
          <EditForm
            currentTodo={currentTodo}
            onEditFormSubmit={handleEditFormSubmit}
            onEditInputChange={handleEditInputChange}
            onEditSelectedInputChange={handleEditSelectedInputChange}
            onEditDetailInputChange={handleEditDetailInputChange}
            setIsEditing={setIsEditing}
          />
        ) : (
          <TodoForm
            handleAddFrom={handleAddFrom}
            todo={todo}
            handleAddInputChange={handleAddInputChange}
          />
        )}
        <Box>
          <FilteringSelect
            id="filter"
            name="filter"
            value={filter}
            onChange={handleSelectedProgress}
          />
        </Box>
        {isfilter ? (
          <>
            <FilteredTable
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </>
        ) : (
          <>
            <TodoTable
              todos={todos}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          </>
        )}
      </VStack>
    </>
  );
};

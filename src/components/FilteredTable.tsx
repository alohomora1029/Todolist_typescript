import React from "react";
import { memo, VFC } from "react";
import { useRecoilValue } from "recoil";
// import { format } from "date-fns";
import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button
} from "@chakra-ui/react";

import { selectProgressState } from "../store/selectProgressState";

type TodoType = {
  id: number;
  title: string;
  progress: string;
  detail: string;
  createddate: string;
  updateddate: any;
};

type Props = {
  handleEditClick: (todo: TodoType) => void;
  handleDeleteClick: (todoId: TodoType["id"]) => void;
};

export const FilteredTable: VFC<Props> = memo((props) => {
  const { handleEditClick, handleDeleteClick } = props;
  const FilteredTodoList = useRecoilValue(selectProgressState);
  // const dueDate = new Date(todo.updateddate.seconds * 1000);
  // const updateDate = format(dueDate, "yyyy年M月d日");
  return (
    <>
      <TableContainer width="auto">
        <Table variant="simple">
          <TableCaption>TodoList</TableCaption>
          <Thead>
            <Tr>
              <Th>id</Th>
              <Th>title</Th>
              <Th>progress</Th>
              <Th>detail</Th>
              <Th>created date</Th>
              <Th>updated date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {FilteredTodoList.map((filteredtodo) => {
              return (
                <Tr key={filteredtodo.id}>
                  <Td>{filteredtodo.id}</Td>
                  <Td>{filteredtodo.title}</Td>
                  <Td>{filteredtodo.progress}</Td>
                  <Td>{filteredtodo.detail}</Td>
                  <Td>{filteredtodo.createddate}</Td>
                  <Td>{filteredtodo.updateddate}</Td>
                  <Td>
                    <Button onClick={() => handleEditClick(filteredtodo)}>
                      編集
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleDeleteClick(filteredtodo.id);
                      }}
                    >
                      削除
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
});

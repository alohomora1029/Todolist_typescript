import { memo, VFC } from "react";
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

type TodoType = {
  id: number;
  title: string;
  progress: string;
  detail: string;
  createddate: string;
  updateddate: any;
};

type Props = {
  todos: TodoType[]; //todosはtodoを要素に持つ配列型なのでこのように指定できる
  handleEditClick: (todo: TodoType) => void;
  handleDeleteClick: (todoId: TodoType["id"]) => void;
};

export const TodoTable: VFC<Props> = memo((props) => {
  const { todos, handleEditClick, handleDeleteClick } = props;

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
            {todos.map((addtodo) => {
              return (
                <Tr key={addtodo.id}>
                  <Td>{addtodo.id}</Td>
                  <Td>{addtodo.title}</Td>
                  <Td>{addtodo.progress}</Td>
                  <Td>{addtodo.detail}</Td>
                  <Td>{addtodo.createddate}</Td>
                  <Td>{addtodo.updateddate}</Td>

                  <Td>
                    <Button onClick={() => handleEditClick(addtodo)}>
                      編集
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      onClick={() => {
                        handleDeleteClick(addtodo.id);
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

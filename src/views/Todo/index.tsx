import { Button, Empty, Input, Tabs, TabsProps , DatePicker} from 'antd';
import { ModalType } from 'common/enum';
import TodoModal from 'components/TodoModal';
import TodoTable from 'components/TodoTable';
import dayjs from 'dayjs';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AppState } from 'store';
import {
  addTodo,
  deleteTodo,
  fetchTodo,
  searchTodo,
  updateTodoContent,
  updateTodoStatus,
} from 'store/todo/actions';
import { keepLogin, logout } from 'store/user/actions';

import styles from './index.module.scss';
const { RangePicker } = DatePicker;

const mapState = ({ todo, user }: AppState) => ({
  todo,
  user,
});

const mapDispatch = {
  logout,
  keepLogin,
  addTodo,
  deleteTodo,
  fetchTodo,
  searchTodo,
  updateTodoContent,
  updateTodoStatus,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface ITodoProps extends PropsFromRedux {}

const Todo: FC<ITodoProps> = ({
  todo,
  user: { userId, username },
  logout,
  deleteTodo,
  fetchTodo,
  updateTodoContent,
  updateTodoStatus,
  addTodo,
  searchTodo,
}) => {

  console.log('任务数据',todo);
  const [visible, setVisible] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.Add);
  const [modalTitle, setModalTitle] = useState('');
  const [content, setContent] = useState('');
  const [todoId, setTodoId] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = (content: string) => {
    addTodo(userId, content, dayjs(new Date().getTime()).toDate().toLocaleString(), deadline);
    setFinished(false);
  };

  const handleUpdateContent = (todoId: string, content: string, deadline: string) => {
    updateTodoContent(todoId, content,deadline);
  };

  const handleDelete = (todoId: string) => {
    deleteTodo(todoId);
  };

  const handleUpdateStatus = (todoId: string) => {
    updateTodoStatus(todoId);
  };

  const handleSearch = (ev: ChangeEvent<HTMLInputElement>) => {
    if(ev.target.value){
      searchTodo(userId, ev.target.value);
    }else{
      userId && fetchTodo(userId);
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setContent('');
  };

  const handleOpenModal = (
    type: ModalType,
    todoId?: string,
    content?: string
  ) => {
    setVisible(true);
    if (type === ModalType.Add) {
      setModalTitle('新增待办事项');
      setContent('');
      setModalType(ModalType.Add);
    }
    if (type === ModalType.Edit) {
      setModalTitle('编辑待办事项');
      setModalType(ModalType.Edit);
      setContent(content!);
      setTodoId(todoId!);
    }
  };

  useEffect(() => {
    userId && fetchTodo(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const TodoTableView = useMemo(()=>{
    return <ul className={styles.list}>
    {todo.length ? (<TodoTable todos={todo
              .filter((v) => v.status === isFinished)} finished={isFinished}
              onShowModal={handleOpenModal}
              onDelete={handleDelete}
              onUpdateStatus={handleUpdateStatus} />) : (
      <Empty className={styles.noData} />
    )}
  </ul>;
  },[handleDelete, handleUpdateStatus, isFinished, todo]);
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `未完成 ❎`,
      children: TodoTableView,
    },
    {
      key: '2',
      label: `已经完成 ✅`,
      children: TodoTableView,
    },
  ];

  const onChange = (key: string) => {
    if(key === '1'){
      setFinished(false);
    }else{
      setFinished(true);
    }
  };

  const onRangeChange = (values: any, formatString: [string, string]) => {
    if(formatString[0]&&formatString[1]){
      searchTodo(userId, '',formatString[0],formatString[1]);
    }else{
      userId && fetchTodo(userId);
    }
  };
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.user}>
        <span>Hi，{username}</span>
        <Button type="ghost" size="small" onClick={logout}>
          退出
        </Button>
      </div>
      <div className={styles.queryBar}>
        <Input
          allowClear
          placeholder="请输入要查询的内容"
          onChange={handleSearch}
        />
        <RangePicker className={styles.rangePicker} onChange={onRangeChange}/>
        <Button
          type="primary"
          onClick={() => handleOpenModal(ModalType.Add)}
          className={styles.newTodo}
        >
          新增
        </Button>
      </div>
      <div className={styles.main}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange}/>
      </div>
      <TodoModal
        todoId={todoId}
        modalType={modalType}
        content={content}
        visible={visible}
        title={modalTitle}
        onClose={handleCloseModal}
        onAdd={handleAdd}
        onUpdateContent={handleUpdateContent}
        onChange={(date:any, dateString:string)=>{
          setDeadline(dateString);
        }}
      />
    </div>
  );
};

export default connector(Todo);

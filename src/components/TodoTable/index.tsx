import React from 'react';
import { Table } from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { ITodoState } from 'store/todo/types';
import dayjs from 'dayjs';
import styles from './index.module.scss';
import { ModalType } from 'common/enum';

interface ITodoTable {
  todos: ITodoState[];
  finished: boolean;
  onShowModal: (type: ModalType, todoId: string, content: string) => void;
  onUpdateStatus: (todoId: string) => void;
  onDelete: (todoId: string) => void;
}

const TodoTable: React.FC<ITodoTable> = ({todos,finished,onShowModal,onUpdateStatus,onDelete} ) => {
  const columns: ColumnsType<ITodoState> = [
    {
      title: 'ID',
      dataIndex: 'ID',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.ID - b.ID,
    },
    {
      title: 'Task',
      dataIndex: 'content',
    },
    {
      title: 'CreateTime',
      dataIndex: 'createTime',
      defaultSortOrder: 'descend',
      render: (text) => <span>{dayjs(text).toDate().toLocaleString()}</span>,
      sorter: (a, b) => dayjs(a.createTime).isBefore(dayjs(b.createTime)) ? -1: 1,
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      render: (text) => <span>{dayjs(text).toDate().toLocaleString()}</span>,
      sorter: (a, b) => dayjs(a.deadline).isBefore(dayjs(b.deadline)) ? -1: 1,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text,record) => <div className={styles.item}>
      <EditOutlined
        className={styles.icon}
        onClick={() => onShowModal(ModalType.Edit, record._id, record.content)}
      />
      {finished ? (
        <UndoOutlined
          className={styles.icon}
          onClick={() => onUpdateStatus(record._id)}
        />
      ) : (
        <CheckOutlined
          className={styles.icon}
          onClick={() => onUpdateStatus(record._id)}
        />
      )}
      <DeleteOutlined className={styles.icon} onClick={() => onDelete(record._id)} />
    </div>,
    },
  ];
  
  const onChange: TableProps<ITodoState>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return  <Table columns={columns} dataSource={todos} rowKey={item=>item.ID} onChange={onChange} />;
};

export default TodoTable;
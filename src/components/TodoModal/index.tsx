import React from 'react';
import { Form, Input, Modal, DatePicker } from 'antd';
import { ModalType } from 'common/enum';
import dayjs from 'dayjs';
import { FC, useEffect } from 'react';

interface ITodoModal {
  todoId: string;
  modalType: string;
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onAdd: (content: string) => void;
  onUpdateContent: (todoId: string, content: string, deadline: string) => void;
  onChange: (date:any, dateString:string) => void;
}

const TodoModal: FC<ITodoModal> = ({
  content,
  visible,
  title,
  modalType,
  todoId,
  onClose,
  onAdd,
  onUpdateContent,
  onChange,
}) => {
  const [form] = Form.useForm();

  const handleOK = () => {
    form.submit();
  };

  const handleFinish = () => {
    const content = form.getFieldValue('content');
    const deadline = form.getFieldValue('deadline');
    if (modalType === ModalType.Add) {
      onAdd(content);
    }
    if (modalType === ModalType.Edit) {
      onUpdateContent(todoId, content, deadline);
    }
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const disabledDate = (current:any)=> {
    // You cannot select dates before today 
    return current && current < dayjs().subtract(1, 'days')
};

  useEffect(() => {
    form.setFieldsValue({ content });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOK}
      onCancel={handleCancel}
      okText="提交"
      cancelText="取消"
    >
      <Form layout="horizontal" form={form} onFinish={handleFinish}>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入内容' }]}
        >
          <Input placeholder="请输入内容" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="截止时间"
          name="deadline"
          rules={[{ required: true }]}
        >
         <DatePicker onChange={onChange} disabledDate={disabledDate}/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoModal;

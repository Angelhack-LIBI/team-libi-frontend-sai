import React, { useState, FunctionComponent, useCallback } from 'react';
import { Button, Modal } from 'antd';
import RegisterForm from 'components/RegisterForm';

interface ILoginModalProps {
}

const RegisterModalButton: FunctionComponent<ILoginModalProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  
  const showModal = useCallback(() => {
    setVisible(true)
  }, [])

  const hideModal = useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const handleOk = useCallback(() => {
    setVisible(false)
  }, [])

  return <>
    <Button type="link" onClick={showModal}>
      회원가입
    </Button>
    <Modal
      title="회원가입"
      visible={visible}
      footer={null}
      // onOk={handleOk}
      onCancel={hideModal}
    >
      <RegisterForm handleOk={handleOk} /> 
    </Modal>
  </>;
};

export default RegisterModalButton;

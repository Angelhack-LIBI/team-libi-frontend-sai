import React, { useState, FunctionComponent, useCallback } from 'react';
import { Button, Modal } from 'antd';
import LoginForm from 'components/LoginForm';

interface ILoginModalProps {
}

const LoginModalButton: FunctionComponent<ILoginModalProps> = (props) => {
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
    <Button type="primary" onClick={showModal}>
      Login
    </Button>
    <Modal
      title="Login"
      visible={visible}
      footer={null}
      // onOk={handleOk}
      onCancel={hideModal}
    >
      <LoginForm /> 
    </Modal>
  </>;
};

export default LoginModalButton;

import React, { FunctionComponent } from 'react';
import { Modal } from 'antd';
import LoginForm from 'components/LoginForm';

interface ILoginModalProps {
  visible: boolean,
  hideModal: Function
}

const LoginModal: FunctionComponent<ILoginModalProps> = ({ visible, hideModal }) => {
  return <Modal
    title="로그인"
    visible={visible}
    footer={null}
    // onOk={handleOk}
    onCancel={hideModal as any}
  >
    <LoginForm handleOk={hideModal} /> 
  </Modal>;
};

export default LoginModal;

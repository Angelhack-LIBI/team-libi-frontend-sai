import React, { useState, FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Button, Modal } from 'antd';
import LoginForm from 'components/LoginForm';
import { useRecoilValue, useRecoilState } from 'recoil';
import tokenState from 'state/token';
import accountState from 'state/account';
import { QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";
import FlexCenter from 'components/FlexCenter';
import axiosInstance from 'api/AxiosInstance';


interface ILoginModalProps {
}

const LoginModalButton: FunctionComponent<ILoginModalProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [token, setToken] = useRecoilState(tokenState);
  const [account, setAccount] = useRecoilState(accountState);
  
  const showModal = useCallback(() => {
    setVisible(true)
  }, [])

  const hideModal = useCallback(() => {
    setVisible(false)
  }, [setVisible, token])

  const onDrop = useCallback(
    async () => {
      const deleted = await axiosInstance.delete('/account/token')
      setToken('')
      setAccount({})
      localStorage.setItem("libi_token", "")
    },
    [],
  )

  useEffect(() => {
    if ((token || '')?.length > 0) {
      setVisible(false)
      const data = token.split(".")
      const { account } = JSON.parse(atob(data[1]))
      setAccount(account)
    }
  }, [token, setAccount])

  console.log('token', token)

  return <>
    {
      (token || '').length > 0 ? <FlexCenter>
        {`${account?.name}님 안녕하세요`}
        <Button type="primary" onClick={() => { onDrop() }} icon={<CloseOutlined />} size={'small'} />
      </FlexCenter> : (
        <Button type="primary" onClick={showModal}>
          Login
        </Button>
      )
    }
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

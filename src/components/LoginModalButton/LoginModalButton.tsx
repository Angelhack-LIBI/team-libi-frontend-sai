import React, { useState, FunctionComponent, useCallback, useEffect, useMemo } from 'react';
import { Button, Modal, message } from 'antd';
import LoginForm from 'components/LoginForm';
import { useRecoilValue, useRecoilState } from 'recoil';
import tokenState from 'state/token';
import accountState from 'state/account';
import { QuestionCircleOutlined, CloseOutlined } from "@ant-design/icons";
import FlexCenter from 'components/FlexCenter';
import axiosInstance from 'api/AxiosInstance';
import LoginModal from 'components/LoginModal';


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
      try {
        await axiosInstance.delete('/account/token')
        setToken('')
        setAccount({})
        localStorage.setItem("libi_token", "")
      } catch ({ response }) {
        message.error(response?.data?.detail);
      }
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

  return <>
    {
      (token || '').length > 0 ? <FlexCenter style={{ color: '#222' }}>
        {`${account?.name}님 안녕하세요`}
        <Button type="primary" style={{ marginLeft: '8px' }} onClick={() => { onDrop() }} size={'small'}>
          로그아웃
        </Button>
      </FlexCenter> : (
        <Button type="primary" onClick={showModal}>
          로그인
        </Button>
      )
    }
    <LoginModal visible={visible} hideModal={hideModal} />
  </>;
};

export default LoginModalButton;

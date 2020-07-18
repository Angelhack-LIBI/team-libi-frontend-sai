import React, { FunctionComponent, useState, ChangeEvent, useCallback } from 'react';
import { Modal, Input, Button } from 'antd';
import FlexCenter from 'components/FlexCenter';

interface IApplyModalProps {
  visible: boolean
  data: any
  handleCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void) | undefined
}

const ApplyModal: FunctionComponent<IApplyModalProps> = (props) => {
  const { visible, data, handleCancel } = props
  
  const [count, setCount] = useState<any>(undefined)

  const asyncFunction = useCallback(
    () => {
      console.log('dd')
    },
    [count]
  )

  return <Modal
    title="공동구매 참여"
    visible={visible}
    footer={null}
    onCancel={handleCancel}
  >
    <Input value={count} onChange={(e: ChangeEvent<HTMLInputElement>) => {
      setCount(Number(e.target.value))
    }} placeholder={'얼마나 주문하시겠어요? (단위만큼 입력)'} type={'number'} />
    <FlexCenter style={{ flexFlow: 'column', marginTop: '8px' }}>
      <Button type={'primary'} style={{ width: '100%', padding: "8px", height: '36px' }} onClick={asyncFunction}>
        참여확정
      </Button>
      <div style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '30px' }}>
        판매자 연락처
      </div>
      {data?.contact || '010-0000-0000'}
    </FlexCenter>
  </Modal>;
};

export default ApplyModal;

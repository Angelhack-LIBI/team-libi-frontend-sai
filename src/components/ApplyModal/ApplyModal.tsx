import React, { FunctionComponent, useState, ChangeEvent, useCallback, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import FlexCenter from 'components/FlexCenter';
import { useParams } from 'react-router-dom';
import axiosInstance from 'api/AxiosInstance';

interface IApplyModalProps {
  visible: boolean
  data: any
  handleCancel: Function
}

const ApplyModal: FunctionComponent<IApplyModalProps> = (props) => {
  const { visible, data, handleCancel } = props
  
  const { productId } = useParams();
  const [contact, setContact] = useState<any>({})

  useEffect(() => {
    axiosInstance.get(`/sharing/${productId}/contact`)
      .then(({ data }) => {
        console.log('data', data)
        setContact(data)
      })
  }, [productId])
  
  const [count, setCount] = useState<any>(undefined)

  const asyncFunction = useCallback(
    async () => {
      if (count && count > 0) {

        const { data } = await axiosInstance.post(`/sharing/${productId}/apply`, { number: count })
        Modal.success({
          content: '성공적으로 참여했습니다.',
        });

        if (handleCancel) {
          handleCancel()
        }
      } else {
        Modal.error({
          content: '갯수를 1 이상으로 선택해 주세요.'
        });
      }
    },
    [count, handleCancel]
  )

  return <Modal
    title="공동구매 참여"
    visible={visible}
    footer={null}
    onCancel={handleCancel as any}
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
      {contact?.phone || '010-0000-0000'}
    </FlexCenter>
  </Modal>;
};

export default ApplyModal;

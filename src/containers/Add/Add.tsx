import React, { FunctionComponent } from 'react';
import AddForm from 'components/AddForm';
import DefaultLayout from 'components/DefaultLayout';
import FlexCenter from 'components/FlexCenter';
import { useParams } from 'react-router-dom';

interface ILoginProps {
}

const colorStyle: any = {
  groupbuying: '#cc3333',
  stackdiscount: '#339999'
}

const Add: FunctionComponent<ILoginProps> = (props) => {
  let { type: sharing_type = '1' } = useParams();
  console.log('sharing_type', sharing_type)
  const type = sharing_type === '1' ? 'groupbuying' : 'stackdiscount'

  return <DefaultLayout>
    <FlexCenter style={{ fontSize: '20px', fontWeight: 'bold', color: '#666', marginBottom: '20px' }}>
      <span style={{ color: colorStyle[type], marginRight: '5px' }}>손쉽게</span>{type === 'groupbuying' ? '공동구매를 진행해 보세요' : '재고상품을 할인 판매해보세요'}!
    </FlexCenter>
    <AddForm  />
  </DefaultLayout>;
};

export default Add;

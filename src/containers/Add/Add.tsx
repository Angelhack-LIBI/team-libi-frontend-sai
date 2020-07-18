import React, { FunctionComponent } from 'react';
import AddForm from 'components/AddForm';
import DefaultLayout from 'components/DefaultLayout';
import FlexCenter from 'components/FlexCenter';

interface ILoginProps {
}

const Add: FunctionComponent<ILoginProps> = (props) => {
  return <DefaultLayout>
    <FlexCenter>
      
    </FlexCenter>
    <AddForm />
  </DefaultLayout>;
};

export default Add;

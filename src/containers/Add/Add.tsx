import React, { FunctionComponent } from 'react';
import AddForm from 'components/AddForm';
import DefaultLayout from 'components/DefaultLayout';

interface ILoginProps {
}

const Add: FunctionComponent<ILoginProps> = (props) => {
  return <DefaultLayout>
    <AddForm />
  </DefaultLayout>;
};

export default Add;

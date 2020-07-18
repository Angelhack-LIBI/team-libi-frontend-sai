import * as React from 'react';
import DefaultLayout from 'components/DefaultLayout';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return <DefaultLayout>
    <div>
      Home
    </div>
  </DefaultLayout>;
};

export default Home;

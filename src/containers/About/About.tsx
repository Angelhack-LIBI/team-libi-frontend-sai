import * as React from 'react';
import DefaultLayout from 'components/DefaultLayout';

interface IAboutProps {
}

const About: React.FunctionComponent<IAboutProps> = (props) => {
  return <DefaultLayout>
    <div>
      About
    </div>
  </DefaultLayout>
};

export default About;

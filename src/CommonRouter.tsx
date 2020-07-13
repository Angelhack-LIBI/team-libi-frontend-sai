import React, { Suspense, lazy, FunctionComponent } from 'react';
import { Route, Switch } from 'react-router-dom';

interface ICustomRotuerProps {
}

const Home = lazy(() => import('containers/Home'));
const About = lazy(() => import('containers/About'));

const CustomRotuer: FunctionComponent<ICustomRotuerProps> = (props) => {
  return <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>;
};

export default CustomRotuer;

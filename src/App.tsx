import React, { FunctionComponent } from "react";
import "antd/dist/antd.less";
import CommonRouter from "./CommonRouter";
import { BrowserRouter as Router } from "react-router-dom";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import commonState from "state/common";
import DefaultLayout from "components/DefaultLayout";

const App: FunctionComponent<any> = () => {
  // const [commons, setCommons] = useRecoilState(commonState);

  return (
    <RecoilRoot>
      <Router>
        <DefaultLayout>
          <CommonRouter />
        </DefaultLayout>
      </Router>
    </RecoilRoot>
  );
};

export default App;

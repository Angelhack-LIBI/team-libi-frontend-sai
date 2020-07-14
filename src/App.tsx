import React, { FunctionComponent } from "react";
import "antd/dist/antd.less";
import { IntlProvider } from "react-intl";
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
import langState, { messages } from "state/lang";

const App: FunctionComponent<any> = () => {
  const lang = useRecoilValue(langState);

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Router>
        <DefaultLayout>
          <CommonRouter />
        </DefaultLayout>
      </Router>
    </IntlProvider>
  );
};

export default App;

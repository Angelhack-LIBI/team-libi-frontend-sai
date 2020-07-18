import React, { FunctionComponent, useEffect } from "react";
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
import categoryState, { CategoryType } from "state/category";
import axiosInstance from "api/AxiosInstance";

const App: FunctionComponent<any> = () => {
  const lang = useRecoilValue(langState);
  const [, setCategory] = useRecoilState<CategoryType[]>(categoryState);
  

  useEffect(() => {
    axiosInstance.get('/sharing/category')
      .then(({ data }) => {
        setCategory(data)
      })
    return () => {
      setCategory([])
    }
  }, [])

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Router>
        {/* <DefaultLayout> */}
          <CommonRouter />
        {/* </DefaultLayout> */}
      </Router>
    </IntlProvider>
  );
};

export default App;

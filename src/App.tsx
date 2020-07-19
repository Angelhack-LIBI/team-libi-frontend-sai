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
import locationState from "state/location";

const App: FunctionComponent<any> = () => {
  const lang = useRecoilValue(langState);
  const [, setCategory] = useRecoilState<CategoryType[]>(categoryState);
  const [, setLocation] = useRecoilState<any>(locationState);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
    });

    axiosInstance.get('/sharing/category')
      .then(({ data }) => {
        setCategory(data)
      })
    axiosInstance.get('/sharing/area/me')
      .then(({ data }) => {
        setLocation(data)
      })
    return () => {
      setCategory([])
      setLocation({})
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

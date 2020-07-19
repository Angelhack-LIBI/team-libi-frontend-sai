import React, { FunctionComponent, useEffect } from "react";
import "antd/dist/antd.less";
import { IntlProvider } from "react-intl";
import CommonRouter from "./CommonRouter";
import { BrowserRouter as Router } from "react-router-dom";

import {
  useRecoilState,
  useRecoilValue,
} from "recoil";
import langState, { messages } from "state/lang";
import categoryState, { CategoryType } from "state/category";
import axiosInstance from "api/AxiosInstance";
import locationState from "state/location";
import tokenState from "state/token";

const App: FunctionComponent<any> = () => {
  const lang = useRecoilValue(langState);
  const token = useRecoilValue(tokenState);
  const [, setCategory] = useRecoilState<CategoryType[]>(categoryState);
  const [, setLocation] = useRecoilState<any>(locationState);
  
  useEffect(() => {
    console.log('token', token)
    if (token) {
      axiosInstance.get('/sharing/area/me')
        .then(({ data }) => {
          setLocation(data)
        })
      navigator.geolocation.getCurrentPosition((position) => {
      })
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        axiosInstance.get('/sharing/area/me')
        .then(({ data }) => {
          setLocation(data)
        })
      });
    }

    axiosInstance.get('/sharing/category')
      .then(({ data }) => {
        setCategory(data)
      })
    return () => {
      setCategory([])
      setLocation({})
    }
  }, [])

  return (
    <IntlProvider locale={lang} messages={messages[lang]}>
      <Router>
        <CommonRouter />
      </Router>
    </IntlProvider>
  );
};

export default App;

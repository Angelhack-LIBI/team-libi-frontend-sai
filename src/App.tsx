import React, { FunctionComponent, useEffect } from "react";
import "antd/dist/antd.less";
import { IntlProvider } from "react-intl";
import CommonRouter from "./CommonRouter";
import queryString from 'query-string'
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

const locationOptions: any = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const App: FunctionComponent<any> = () => {
  const lang = useRecoilValue(langState);
  const token = useRecoilValue(tokenState);
  const [, setCategory] = useRecoilState<CategoryType[]>(categoryState);
  const [, setLocation] = useRecoilState<any>(locationState);
  
  useEffect(() => {
    const success = (pos) => {
      const { latitude: lat, longitude: long } = pos.coords;
      axiosInstance.get(`/sharing/area/me?${queryString.stringify({ lat, long })}`)
        .then(({ data }) => {
          setLocation(data)
        })
    };
    
    const error = (err) => {
      axiosInstance.get('/sharing/area/me')
      .then(({ data }) => {
        setLocation(data)
      })
    };

    console.log('token', token)
    if (token) {
      navigator.geolocation.getCurrentPosition(success, error, locationOptions);
    } else {
      navigator.geolocation.getCurrentPosition(success, () => {}, locationOptions);
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

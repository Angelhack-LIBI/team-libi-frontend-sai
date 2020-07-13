import { atom } from "recoil";

const commonState = atom<any>({
  key: 'commonState', // unique ID (with respect to other atoms/selectors)
  default: {

  }
});

export default commonState
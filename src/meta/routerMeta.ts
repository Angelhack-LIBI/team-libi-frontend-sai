import { RouteProps } from "react-router"

export type RouterMetaType = { [key: string] : (string | Omit<RouteProps, 'component'>) } 

const routerMeta: RouterMetaType = {
  Home: { path: '/', exact: true },
  About: '/about',
  Login: '/login',
  Register: '/register',
  Add: '/add',
  CardView: '/cardview'
}

export default routerMeta
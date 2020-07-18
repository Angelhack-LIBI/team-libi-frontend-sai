import { RouteProps } from "react-router"

export type RouterMetaType = { [key: string] : (string | Omit<RouteProps, 'component'>) } 

const routerMeta: RouterMetaType = {
  Home: { path: '/', exact: true },
  About: '/about/:productId',
  Login: '/login',
  Register: '/register',
  Add: '/add/:type',
  CardView: '/cardview'
}

export default routerMeta
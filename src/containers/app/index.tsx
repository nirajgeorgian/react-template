import { lazy } from 'react'

const LazyMain = lazy(() => import(/* webpackChunkName: "pages-app" */ 'containers/app/page'))

export default LazyMain

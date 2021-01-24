import * as React from 'react';
import { Switch, RouteProps, Route } from 'react-router-dom'

const { lazy, Suspense } = React;

import Loading from '../components/loading';

// import Home from '../components/home';
// import Banner from '../components/banner'
const Home = lazy(() =>
    import(/* webpackChunkName: "banner" */"../components/home")
)
const Banner = lazy(() =>
    import(/* webpackChunkName: "banner" */"../components/banner")
)


const routes: RouteProps[] = [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/banner',
        exact: true,
        component: Banner
    }
]
const Routes = () => (
    <Suspense fallback= {<Loading />} >
        <Switch>
            {
            routes.map(r => {
                const { path, exact, component } = r;
                const LazyCom = component;
                return (
                    <Route key = { path + "" } exact = { exact } path = { path } render = { () => <LazyCom /> } />

                )

            })
            }
        </Switch>
    </Suspense>
)

export default Routes;
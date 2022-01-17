import { lazy } from 'react';

import { wrap } from '#base/utils/routes';

const fourHundredFour = wrap({
    path: '*',
    title: '404',
    component: lazy(() => import('#base/components/PreloadMessage')),
    componentProps: {
        heading: '404',
        content: 'What you are looking for does not exist.',
    },
    visibility: 'is-anything',
    navbarVisibility: true,
});
const login = wrap({
    path: '/login/',
    title: 'Login',
    navbarVisibility: false,
    component: lazy(() => import('#views/Login')),
    componentProps: {},
    visibility: 'is-not-authenticated',
});
const dashboard = wrap({
    path: '/',
    title: 'Report',
    navbarVisibility: true,
    component: lazy(() => import('#views/Dashboard')),
    componentProps: {},
    visibility: 'is-authenticated',
});
const myChrono = wrap({
    path: '/my-chrono/',
    title: 'Chrono',
    navbarVisibility: true,
    component: lazy(() => import('#views/Chrono')),
    componentProps: {},
    visibility: 'is-authenticated',
});
const myProfile = wrap({
    path: '/my-profile/',
    title: 'My Profile',
    navbarVisibility: true,
    component: lazy(() => import('#views/Template')),
    componentProps: {
        name: 'My Profile Page',
    },
    visibility: 'is-authenticated',
});

const routes = {
    login,
    dashboard,
    myProfile,
    myChrono,
    fourHundredFour,
};
export default routes;

import Home from '../pages/Home';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/company/',
    popup: {
      asyncComponent: () =>
        import(
          /* webpackChunkName: "company-profile" */ /* webpackPreload: true */ '../pages/CompanyProfile'
        ),
    },
  },
  {
    path: '/about/',
    popup: {
      asyncComponent: () =>
        import(
          /* webpackChunkName: "about" */ /* webpackPreload: true */ '../pages/About'
        ),
    },
  },
];

export default routes;

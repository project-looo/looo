import React from 'react';
import { App, View } from 'framework7-react';
import routes from '../js/routes';

const F7App = () => {
  return (
    <App
      params={{
        name: 'Project Looc',
        theme: 'auto',
        routes,
        navbar: {
          mdCenterTitle: true,
        },
        touch: {
          mdTouchRipple: false,
        },
        serviceWorker:
          process.env.NODE_ENV === 'production'
            ? {
                path: '/service-worker.js',
              }
            : {},
      }}
    >
      <View main className="safe-areas" url="/" />
    </App>
  );
};
export default F7App;

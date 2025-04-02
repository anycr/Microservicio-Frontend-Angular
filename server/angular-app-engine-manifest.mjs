
export default {
  basePath: '/Microservicio-Frontend-Angular',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};

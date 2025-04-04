
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/Microservicio-Frontend-Angular/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/Microservicio-Frontend-Angular"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1297, hash: 'dc2e981aabbeb8d897b10b07058cf61d6a749339c4d5fa27370f507141f6e032', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1259, hash: '3433aab6ab6e593818e7d3a45fbf2611c407014415b66d0f5cec89a0c2601d1b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 1470, hash: '31be9264d2438680de75abdae87330568ad0050e833a58f873350cb52d50f4dd', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MJNEHNMN.css': {size: 427, hash: '7PDdqsSfN4k', text: () => import('./assets-chunks/styles-MJNEHNMN_css.mjs').then(m => m.default)}
  },
};

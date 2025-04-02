
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
    'index.csr.html': {size: 1297, hash: 'b5e514a8a15f76a4394524d3c265ed9e37e8a987d425ccaab972e5f75c191fa5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1259, hash: 'd12acc0487a961aba6eb2429ca57e1f2fda75cb437161053eff770a05d1a5e9d', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 1470, hash: '2b4e1b1fa47db7cdb261e8dafb02942d555b3b35be90316ddac266a24c504698', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-MJNEHNMN.css': {size: 427, hash: '7PDdqsSfN4k', text: () => import('./assets-chunks/styles-MJNEHNMN_css.mjs').then(m => m.default)}
  },
};

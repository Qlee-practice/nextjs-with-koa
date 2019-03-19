const routesPage = require('next-routes');

const pageRoutes = routesPage()
  .add({ name: 'home', pattern: '/', page: '/index' })
  .add({ name: 'about', pattern: '/about', page: '/about' })
  .add({ name: 'customerDetail', pattern: '/customer/:id/detail', page: '/customer/detail' });


module.exports = pageRoutes;
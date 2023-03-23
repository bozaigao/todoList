import { SwaggerRouter } from 'koa-swagger-decorator';

const koaRouterOpts = { prefix: '/api' };
const swaggerRouterOpts = {
  title: 'API Todo Server',
  description: 'API DOC',
  version: '1.0.0'
};
const router = new SwaggerRouter(koaRouterOpts, swaggerRouterOpts);

// swagger docs avaliable at http://127.0.0.1:5000/api/v2/swagger-html
router.swagger();

router.mapDir(__dirname);

export default router;

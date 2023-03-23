import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

import Config from './config';
import connectDB from './db';
import router from './routes/index';

const app = new Koa();

connectDB(Config.MONGODB_URI);

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes());

app.listen(Config.PORT, () => {
  console.log(`server starts successful: http://127.0.0.1:${Config.PORT}`);
});

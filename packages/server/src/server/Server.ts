import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { router } from './routes';
import '@csnvt/services/TranslationYup';
import { JSONParserError } from '@csnvt/middleware';

const server = express();

server.use(
  cors({
    origin: process.env.ENABLED_CORS?.split(';') || [],
  }),
);

server.use(express.json());
server.use(JSONParserError);
server.use(router);

export { server };

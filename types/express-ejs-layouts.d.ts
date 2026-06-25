/**
 * Ambient declaration for express-ejs-layouts, which ships without types.
 * It is consumed only as `app.use(expressLayouts)`, so a single RequestHandler
 * export is all we need.
 */
declare module 'express-ejs-layouts' {
  import { RequestHandler } from 'express';
  const expressLayouts: RequestHandler;
  export = expressLayouts;
}

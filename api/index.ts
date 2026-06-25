/**
 * Vercel serverless entry point.
 *
 * The Express application is exported as the request handler. Vercel's Node
 * runtime invokes `app(req, res)` for every request routed here by the rewrite
 * in vercel.json. The app never calls listen() on Vercel (see app.ts).
 */
import app from '../app';

export default app;

'use strict';

const config = require('../config');

/**
 * Tiny structured logger. Avoids a heavy logging dependency while keeping
 * output consistent. In production it emits single-line JSON (easy to ship to
 * a log aggregator); in development it prints readable lines.
 */

function write(level, message, meta) {
  const time = new Date().toISOString();
  if (config.isProd) {
    const record = { time, level, message };
    if (meta && Object.keys(meta).length) record.meta = meta;
    // eslint-disable-next-line no-console
    console[level === 'error' ? 'error' : 'log'](JSON.stringify(record));
  } else {
    const tag = level.toUpperCase().padEnd(5);
    // eslint-disable-next-line no-console
    console[level === 'error' ? 'error' : 'log'](
      `${time}  ${tag}  ${message}${meta ? `  ${JSON.stringify(meta)}` : ''}`
    );
  }
}

module.exports = {
  info: (msg, meta) => write('info', msg, meta),
  warn: (msg, meta) => write('warn', msg, meta),
  error: (msg, meta) => write('error', msg, meta),
};

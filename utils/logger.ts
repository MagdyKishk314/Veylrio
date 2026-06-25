import config from '../config';

/**
 * Tiny structured logger. Avoids a heavy logging dependency while keeping
 * output consistent. In production it emits single-line JSON (easy to ship to
 * a log aggregator); in development it prints readable lines.
 */

type LogLevel = 'info' | 'warn' | 'error';
type Meta = Record<string, unknown>;

function write(level: LogLevel, message: string, meta?: Meta): void {
  const time = new Date().toISOString();
  if (config.isProd) {
    const record: Record<string, unknown> = { time, level, message };
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

const logger = {
  info: (msg: string, meta?: Meta) => write('info', msg, meta),
  warn: (msg: string, meta?: Meta) => write('warn', msg, meta),
  error: (msg: string, meta?: Meta) => write('error', msg, meta),
};

export default logger;

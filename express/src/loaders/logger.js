//|  Development Notes
//|------------------------------------------------------------------------
//| 12-22-19: keeping the boilerplate as-is for now
//| 12-22-19: added 'alignColorsAndTime' but will wait to integrate as to not create new errors




import winston from 'winston';
import config from '../config';

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all:true
  }),
  winston.format.label({
    label:'[LOGGER]'
  }),
  winston.format.timestamp({
    format:"YY-MM-DD  HH:mm:ss"
  }),
  winston.format.printf(
    info => `${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
  )
);

const transports = [];
if(process.env.NODE_ENV !== 'development') {
  transports.push(
    new winston.transports.Console()
  )
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      )
    })
  )
}

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  transports
});

export default LoggerInstance;
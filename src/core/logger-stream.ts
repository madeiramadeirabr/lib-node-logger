import { Readable } from 'stream';
import { StreamLoggerInterface } from './interface/stream-logger';

export class StreamLogger extends Readable implements StreamLoggerInterface {
  constructor() {
    super();
    this.pipe(process.stdout);
    this.setEncoding('utf8');
  }

  log(message: string | null) {
    if (message === null) return;
    if (this.isPaused()) this.resume();
    this.push(message + ' \n');
  }

  _read() {
    // required for a readable stream, but not needed to implement
  }
}

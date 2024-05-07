import Worker from 'worker_threads';
import worker from '../src/worker/runner.ts';

const reply = (response,) => Worker.parentPort.postMessage(response,);

Worker.parentPort.on(
  'message',
  (message,) => worker(message, reply,),
);

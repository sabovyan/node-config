import { EventEmitter } from 'node:events';

function greet() {
  return 'Hello World';
}

const event = new EventEmitter();

event.on('test', () => {
  console.log(greet());
});

event.emit('test');

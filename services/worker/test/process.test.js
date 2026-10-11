const test = require('node:test');
const assert = require('node:assert');
const { nextStatus, estimateEta } = require('../src/process');

test('nextStatus moves an order forward', () => {
  assert.strictEqual(nextStatus('placed'), 'preparing');
  assert.strictEqual(nextStatus('out_for_delivery'), 'delivered');
});

test('nextStatus stays on delivered', () => {
  assert.strictEqual(nextStatus('delivered'), 'delivered');
});

test('nextStatus throws on a bad status', () => {
  assert.throws(() => nextStatus('lost'));
});

test('eta for a 2km order is at most 16 minutes', () => {
  assert.ok(estimateEta(2) <= 16);
});

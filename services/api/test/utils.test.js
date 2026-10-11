const test = require('node:test');
const assert = require('node:assert');
const { validateOrder, formatOrder } = require('../src/utils');

test('validateOrder accepts a good order', () => {
  assert.strictEqual(validateOrder({ customer: 'Asha', item: 'Dosa' }).ok, true);
});

test('validateOrder rejects a missing customer', () => {
  assert.strictEqual(validateOrder({ item: 'Dosa' }).ok, false);
});

test('validateOrder rejects an empty item', () => {
  assert.strictEqual(validateOrder({ customer: 'Asha', item: '  ' }).ok, false);
});

test('formatOrder adds eta text', () => {
  assert.strictEqual(formatOrder({ id: 1, eta_minutes: 12 }).eta_text, '12 min');
  assert.strictEqual(formatOrder({ id: 2, eta_minutes: null }).eta_text, 'calculating...');
});

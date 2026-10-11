// small helpers, kept separate so they are easy to test

function validateOrder(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'body must be an object' };
  }
  if (typeof body.customer !== 'string' || body.customer.trim() === '') {
    return { ok: false, error: 'customer is required' };
  }
  if (typeof body.item !== 'string' || body.item.trim() === '') {
    return { ok: false, error: 'item is required' };
  }
  return { ok: true };
}

function formatOrder(row) {
  return {
    ...row,
    eta_text: row.eta_minutes == null ? 'calculating...' : row.eta_minutes + ' min',
  };
}

module.exports = { validateOrder, formatOrder };

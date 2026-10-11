const FLOW = ['placed', 'preparing', 'out_for_delivery', 'delivered'];

function nextStatus(current) {
  const i = FLOW.indexOf(current);
  if (i === -1) {
    throw new Error('unknown status: ' + current);
  }
  return FLOW[Math.min(i + 1, FLOW.length - 1)];
}

// rough delivery time in minutes
function estimateEta(distanceKm) {
  const base = 8 + distanceKm * 3;
  const jitter = Math.floor(Math.random() * 4); // traffic
  return base + jitter;
}

module.exports = { nextStatus, estimateEta, FLOW };

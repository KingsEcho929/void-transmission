// courier-burn.js
// 🔥 Eternal Flame — burns all scrolls held by the steward for a courier

const fs = require('fs');
const path = require('path');

// Get courier name from argument
const courierName = process.argv[2];
if (!courierName) {
  console.error('❌ Courier name required: node courier-burn.js <courierName>');
  process.exit(1);
}

// Path to courier's outbox
const outboxPath = path.resolve(__dirname, '..', 'delivery', 'outbox', courierName);

// Burn all .age scrolls in the outbox
function burnScrolls(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`📭 No outbox found for courier: ${courierName}`);
    return;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.age'));
  if (files.length === 0) {
    console.log(`🕳️ No scrolls to burn for ${courierName}.`);
    return;
  }

  for (const file of files) {
    const filePath = path.join(dir, file);
    fs.unlinkSync(filePath);
    console.log(`🔥 Burned scroll: ${file}`);
  }

  console.log(`✅ All scrolls incinerated for ${courierName}.`);
}

burnScrolls(outboxPath);

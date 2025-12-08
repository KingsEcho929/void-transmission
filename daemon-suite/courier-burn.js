#!/usr/bin/env node

// courier-burn.js
// 🔥 Eternal Flame — burns all scrolls in a courier's outbox

const fs = require('fs');
const path = require('path');
const { cleanTemp } = require('./cleanup');  // ✨ new import

const courierName = process.argv[2];
if (!courierName) {
  console.error('❌ Courier name required: ./courier-burn.js <courierName>');
  process.exit(1);
}

const outboxPath = path.resolve(__dirname, '..', 'delivery', 'outbox', courierName);

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

// ✨ Final ritual: purge temp staging chamber
cleanTemp();

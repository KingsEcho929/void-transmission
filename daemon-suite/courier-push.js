#!/usr/bin/env node

// courier-push.js
// 🚀 Push Daemon — encrypts a scroll and drops it into the recipient's outbox

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { cleanTemp } = require('./cleanup');  // ✨ new import

const recipient = process.argv[2];
const message = process.argv[3];

if (!recipient || !message) {
  console.error('❌ Usage: ./courier-push.js <recipient> "<message text>"');
  process.exit(1);
}

const repoRoot = path.resolve(__dirname, '..');
const outboxDir = path.join(repoRoot, 'delivery', 'outbox', recipient);
const recipientPubKey = path.join(repoRoot, 'delivery', 'contacts', `${recipient}.pub`);

if (!fs.existsSync(recipientPubKey)) {
  console.error(`❌ No public key found for recipient: ${recipient}`);
  process.exit(1);
}

// Ensure recipient outbox exists
fs.mkdirSync(outboxDir, { recursive: true });

// Create temp file with message
const tempFile = path.join(repoRoot, 'delivery', 'temp', `message-${Date.now()}.txt`);
fs.writeFileSync(tempFile, message);

// Encrypt with age
const outFile = path.join(outboxDir, `message-${new Date().toISOString().replace(/[:.]/g, '-')}.age`);
const encrypted = spawnSync('age', ['-r', recipientPubKey, '-o', outFile, tempFile], { encoding: 'utf8' });

if (encrypted.error) {
  console.error('❌ Error running age:', encrypted.error.message);
  process.exit(1);
}
if (encrypted.status !== 0) {
  console.error('⚠️ Encryption failed:', encrypted.stderr.toString());
  process.exit(1);
}

console.log(`✅ Scroll pushed to ${recipient}'s outbox: ${outFile}`);

// Clean temp file (direct unlink)
if (fs.existsSync(tempFile)) {
  fs.unlinkSync(tempFile);
}

// ✨ Final ritual: purge any other leftovers in delivery/temp
cleanTemp();

// Git commit + push
spawnSync('git', ['add', '.'], { stdio: 'inherit' });
spawnSync('git', ['commit', '-m', `Push scroll for ${recipient}`], { stdio: 'inherit' });
spawnSync('git', ['push', 'origin', 'main'], { stdio: 'inherit' });

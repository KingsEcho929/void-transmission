// courier-pull.js

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// CONFIG: Puller's name (used to locate their outbox folder and key)
const pullerName = process.argv[2];
if (!pullerName) {
  console.error('❌ Puller name required as argument: node courier-pull.js <pullerName>');
  process.exit(1);
}

// CONFIG: Puller's private key path
const pullerKeyPath = path.resolve(__dirname, '..', 'delivery', 'keys', `${pullerName}.agekey`);

// CONFIG: Corridor path (Git repo directory)
const outboxRoot = path.resolve(__dirname, '..', 'delivery', 'outbox');
const pullerOutbox = path.join(outboxRoot, pullerName);

// Step 1: Find latest .age file
function getLatestPayload(dir) {
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.age'))
    .sort((a, b) => fs.statSync(path.join(dir, b)).mtime - fs.statSync(path.join(dir, a)).mtime);
  return files.length ? path.join(dir, files[0]) : null;
}

// Step 2: Decrypt using age and puller's private key
function decryptPayload(payloadPath, privateKeyPath) {
  const decrypted = spawnSync(
    'age',
    ['-d', '-i', privateKeyPath, payloadPath],
    { encoding: 'utf8' }
  );

  if (decrypted.error) {
    console.error('❌ Error running age:', decrypted.error.message);
    return null;
  }

  if (decrypted.status !== 0) {
    console.error('⚠️ Decryption failed:', decrypted.stderr.toString());
    return null;
  }

  return decrypted.stdout.trim();
}

// Step 3: Crown the payload
function crownPull() {
  const payloadPath = getLatestPayload(pullerOutbox);
  if (!payloadPath) {
    console.log('📭 No encrypted payloads found for puller.');
    return;
  }

  const message = decryptPayload(payloadPath, pullerKeyPath);
  if (message) {
    console.log('👑 Payload crowned and decrypted:');
    console.log('---');
    console.log(message);
    console.log('---');
  } else {
    console.log('🕳️ No matching payload for puller key. Daemon returns null with ache glyph.');
  }
}

crownPull();


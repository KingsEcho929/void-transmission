const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const readline = require('readline');

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (q) => new Promise((res) => rl.question(q, res));

  const repoRoot = path.resolve(__dirname, '..');
  const contactsPath = path.join(repoRoot, 'delivery', 'contacts', 'contacts.json');
  const outboxDir = path.join(repoRoot, 'delivery', 'outbox');

  const recipient = (await ask('Enter recipient name: ')).trim();
  const message = await ask('Enter message: ');
  rl.close();

  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  const pubkeyPath = contacts[recipient];

  if (!pubkeyPath || !fs.existsSync(pubkeyPath)) {
    console.error(`❌ No public key found for recipient "${recipient}" in contacts.json or file missing.`);
    return;
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outFile = path.join(outboxDir, recipient, `message-${timestamp}.age`);

  // Ensure outbox directory exists
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  // Write message to temp file
  const tmpMessagePath = path.join(repoRoot, 'tmp-message.txt');
  fs.writeFileSync(tmpMessagePath, message, 'utf8');

  // Encrypt with age using -R and input/output files
  const age = spawnSync(
    'age',
    ['-R', pubkeyPath, '-o', outFile, tmpMessagePath],
    { encoding: 'utf8' }
  );

  // Clean up temp file
  fs.unlinkSync(tmpMessagePath);

  if (age.error) {
    console.error('❌ Error running age:', age.error.message);
    return;
  }

  if (age.status !== 0) {
    console.error('❌ age encryption failed:', age.stderr.toString());
    return;
  }

  console.log(`✅ Message encrypted and saved to ${outFile}`);
})();

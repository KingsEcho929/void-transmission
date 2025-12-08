#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { spawnSync } = require('child_process');
const { cleanTemp } = require('./cleanup');  // ✨ new import

const KEYS_DIR = path.join(__dirname, '../delivery/keys');
const CONTACTS_DIR = path.join(__dirname, '../delivery/contacts');
const CONTACTS_JSON = path.join(CONTACTS_DIR, 'contacts.json');

// Ensure directories exist
fs.mkdirSync(KEYS_DIR, { recursive: true });
fs.mkdirSync(CONTACTS_DIR, { recursive: true });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter name for keypair: ', (name) => {
  const privKeyPath = path.join(KEYS_DIR, `${name}.agekey`);
  const pubKeyPath = `${privKeyPath}.pub`;
  const contactPubPath = path.join(CONTACTS_DIR, `${name}.pub`);

  if (fs.existsSync(privKeyPath)) {
    console.log(`❌ Keypair '${name}' already exists at ${privKeyPath}`);
  } else {
    const result = spawnSync('age-keygen', ['-o', privKeyPath], { encoding: 'utf-8' });

    if (result.error) {
      console.error(`⚠️ Failed to generate keypair: ${result.error.message}`);
      rl.close();
      return;
    }

    const pubResult = spawnSync('age-keygen', ['-y', privKeyPath], { encoding: 'utf-8' });
    fs.writeFileSync(pubKeyPath, pubResult.stdout);

    console.log(`✅ Age keypair generated for '${name}'`);
    console.log(`🔐 Private: ${privKeyPath}`);
    console.log(`📜 Public: ${pubKeyPath}`);

    // Auto-copy .pub file into contacts
    try {
      fs.copyFileSync(pubKeyPath, contactPubPath);
      console.log(`📬 Copied public key to contacts: ${contactPubPath}`);
    } catch (err) {
      console.error(`⚠️ Failed to copy public key to contacts: ${err.message}`);
    }
  }

  // Sync all .pub files in contacts/ into contacts.json
  const contacts = {};
  const files = fs.readdirSync(CONTACTS_DIR);

  files.forEach(file => {
    if (file.endsWith('.pub')) {
      const contactName = path.basename(file, '.pub');
      contacts[contactName] = path.join(CONTACTS_DIR, file);
    }
  });

  fs.writeFileSync(CONTACTS_JSON, JSON.stringify(contacts, null, 2));
  console.log('🔄 Synced all .pub files into contacts.json');

  rl.close();

  // ✨ Final ritual: purge temp staging chamber
  cleanTemp();
});

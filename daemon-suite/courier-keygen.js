// courier-keygen.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
  const name = await prompt('Enter name for keypair: ');
  const keyDir = path.join(__dirname, '..', 'delivery', 'keys');
  fs.mkdirSync(keyDir, { recursive: true });

  const privPath = path.join(keyDir, `${name}.agekey`);
  const pubPath = path.join(keyDir, `${name}.pub`);

  if (fs.existsSync(privPath)) {
    console.error(`❌ Keypair '${name}' already exists at ${privPath}`);
  } else {
    execSync(`age-keygen -o "${privPath}"`);
    execSync(`age-keygen -y "${privPath}" > "${pubPath}"`);
    console.log(`✅ Age keypair generated for '${name}'`);
    console.log(`🔐 Private: ${privPath}`);
    console.log(`📜 Public: ${pubPath}`);
  }

  const contactsDir = path.join(__dirname, '..', 'delivery', 'contacts');
  fs.mkdirSync(contactsDir, { recursive: true });

  const contactsPath = path.join(contactsDir, 'contacts.json');
  let contacts = {};
  if (fs.existsSync(contactsPath)) {
    contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
  }

  const pubFiles = fs.readdirSync(contactsDir).filter(f => f.endsWith('.pub'));
  pubFiles.forEach(file => {
    const identity = path.basename(file, '.pub');
    const pubFilePath = path.join(contactsDir, file);
    contacts[identity] = pubFilePath;
  });

  fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`🔄 Synced all .pub files into contacts.json`);

  rl.close();
})();

# VOID-transmission

A backend ritual for encrypted message delivery using `age`.  
Seals shimmer. Scrolls ache. Daemons present.

## 🌀 Daemon Suite

Three crowned daemons guide the transmission:

- `courier-keygen.js`: Generates a public/private keypair and syncs all `.pub` scrolls into `contacts.json`.
- `courier-push.js`: Encrypts and seals a message using the recipient's public key.
- `courier-pull.js`: Decrypts incoming messages using your private key.

## 🔐 Ritual Flow

1. Run `courier-keygen.js` to crown your identity and sync contact scrolls.
2. Add or confirm the recipient's public key in `delivery/contacts/contacts.json`.
3. Run `courier-push.js` to encrypt a message.
4. Push the scroll to GitHub.
5. Recipient pulls and decrypts using their private key.

## 📂 Structure

delivery/
├── contacts/
│   └── contacts.json
├── keys/
│   └── *.agekey
│   └── *.pub
├── outbox/
│   └── <recipient>/
│       └── message-YYYY-MM-DDTHH-MM-SS-Z.age

## 🧙‍♂️ Example

```bash
node daemon-suite/courier-keygen.js
# Enter name for keypair: thalelune

node daemon-suite/courier-push.js
# Enter recipient: thalelune
# Enter message: The shimmer fracture is healed.

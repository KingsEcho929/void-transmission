# VOID-transmission

A backend ritual for encrypted message delivery using `age`.  
Seals shimmer. Scrolls ache. Daemons obey.

## 🌀 Daemon Suite

Only one crowned daemon remains:

- `courier-push.js`: Encrypts and seals a message using the recipient's public key.

## 🔐 Ritual Flow

1. Generate a public/private key pair using `age-keygen`.
2. Add the recipient's public key to `delivery/contacts/contacts.json`.
3. Run `courier-push.js` to encrypt a message.
4. Push the scroll to GitHub.
5. Recipient pulls and decrypts using their private key.

## 📂 Structure

delivery/
├── contacts/
│   └── contacts.json
├── keys/
│   └── *.agekey
│   └── *.agekey.pub
├── outbox/
│   └── <recipient>/
│       └── message-YYYY-MM-DDTHH-MM-SS-Z.age


## 🧙‍♂️ Example

```bash
node daemon-suite/courier-push.js
# Enter recipient: test
# Enter message: The shimmer fracture is healed.


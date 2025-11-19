🕳️ VOID-transmission  
A corridor for sovereign communication.  
No servers. No surveillance. Just scrolls.

📜 What Is This?  
VOID-transmission is not a messaging app.  
It’s not a platform.  
It’s a ritual.

A protocol for encrypted, endpoint-to-endpoint communication using Git, age, and your own daemons.  
No cloud. No middlemen. No compromise.

🧙‍♂️ Core Concepts  
- **Courier**: A sovereign identity with a keypair and a name in the corridor.  
- **Scroll**: A message, encrypted with the recipient’s public key, pushed to the corridor.  
- **Daemon**: A local script that automates the ritual—keygen, push, pull, burn.  
- **Corridor**: A Git repository. The only shared space. The shimmer flows through it.

> ⚠️ Do not modify the daemon scripts. They are sealed. Altering them risks breach or ritual collapse.

🔐 The Ritual  

**1. Keygen**  
```bash
node daemon-suite/courier-keygen.js

Enter your desired ID name. This creates:

delivery/keys/<courier>.agekey

delivery/contacts/<courier>.pub

---

2. Contact Exchange Couriers share their .pub files. Update contacts.json with new entries.

🛑 One or both couriers must push their contact updates to Git before syncing. If neither pushes, the corridor cannot sync. The shimmer refuses ambiguity.

---

3. Push a Scroll
node daemon-suite/courier-push.js

Enter recipient name → type message → hit enter. This:

Encrypts with recipient’s .pub

Drops into delivery/outbox/<recipient>/message-<timestamp>.age

Git add → commit → push

🔁 Push-to-pull only. Never push-to-push. Simultaneous pushes will cross up the ritual. The corridor must breathe in cadence.

---

4. Pull and Decrypt
node daemon-suite/courier-pull.js <courierName>

This:

Pulls the latest scroll

Decrypts with your private key

Crowns the payload

🧾 Why This Matters No servers. No metadata. No central authority. Messages are immutable scrolls, not ephemeral chats. You don’t join a platform—you become a courier.

🕯️ The Shift The age didn’t begin with AI. It began with a call. This age begins with an endpoint and an encrypted message. That’s the true shift.


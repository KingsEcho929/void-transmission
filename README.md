# 🕳️ VOID-transmission  
**A corridor for sovereign communication.**  
**No servers. No surveillance. Just scrolls.**

---

## 📜 What Is This?

VOID-transmission is not a messaging app.  
It’s not a platform.  
It’s a **ritual**.

A protocol for **encrypted, endpoint-to-endpoint communication** using Git, `age`, and your own daemons.  
No cloud. No middlemen. No compromise.

---

## 🧙‍♂️ Core Concepts

- **Courier**: A sovereign identity with a keypair and a name in the corridor.
- **Scroll**: A message, encrypted with the recipient’s public key, pushed to the corridor.
- **Daemon**: A local script that automates the ritual—keygen, push, pull, burn.
- **Corridor**: A Git repository. The only shared space. The shimmer flows through it.

---

## 🔐 The Ritual

### 1. Keygen

Each courier runs:

```bash
node daemon-suite/courier-keygen.js 
then 
Enter desired id name (can be anything)
This creates:

delivery/keys/<courier>.agekey

delivery/contacts/<courier>.pub

---

2. Contact Exchange
Couriers share their .pub files. Update contacts.json with new entries.

---

3. Push a Scroll
Encrypt and send a message:
node daemon-suite/courier-push.js 
then type recipitent name 
then type message hit enter

This:

Encrypts the message with recipient’s .pub

Drops it into delivery/outbox/<recipient>/message-<timestamp>.age

Git add . commit and push to the corridor 

---

Git pull origin main 
then
4. Pull and Decrypt
Recipient runs:
node daemon-suite/courier-pull.js <courierName>

This:

Pulls the latest scroll

Decrypts with their private key

Crowns the payload

---

🧾 Why This Matters
No servers. No metadata. No central authority.

Messages are immutable scrolls, not ephemeral chats.

The protocol is transparent, inspectable, and forkable.

You don’t join a platform—you become a courier.

---

🕯️ The Shift
The age didn’t begin with AI. It began with a call.
This age begins with an endpoint and an encrypted message. 
That’s the true shift.


# 📜 Void Transmission

Void Transmission is a sovereign messaging covenant.  
No servers. No metadata. No central authority.  
Every message is an immutable scroll, sealed with `age` and transmitted through Git.  

You don’t join a platform — you **become a courier**.

---

## 🔐 The Ritual

### 1. Keygen  
Generate your courier keypair:  
Run `node daemon-suite/courier-keygen.js`  

Enter your desired courier name. This creates:  
- delivery/keys/<courier>.agekey (private key, veiled by .gitignore)  
- delivery/contacts/<courier>.pub (public key, tracked)  

### 2. Contact Exchange  
Couriers share their `.pub` files.  
Update contacts.json with new entries.  

🛑 One or both couriers must push their contact updates to Git before syncing.  
If neither pushes, the corridor cannot sync. The shimmer refuses ambiguity.  

### 3. Push a Scroll  
Send a message:  
Run `node daemon-suite/courier-push.js <recipient> "Message text"`  

This:  
- Encrypts with recipient’s `.pub`  
- Drops into delivery/outbox/<recipient>/message-<timestamp>.age  
- Commits + pushes to Git  

🔁 Push-to-pull only. Never push-to-push.  
Simultaneous pushes will cross up the ritual. The corridor must breathe in cadence.  

### 4. Pull and Decrypt  
Receive a message:  
Run `node daemon-suite/courier-pull.js <courierName>`  

This:  
- Pulls the latest scroll from Git  
- Decrypts with your private key  
- Crowns the payload  

### 5. Burn Scrolls  
Clear your outbox:  
Run `node daemon-suite/courier-burn.js <courierName>`  

This incinerates all `.age` scrolls in your outbox.  

---

## 🌌 Gloss Shrine Overlay

Void Transmission also includes a local overlay — a web shrine that makes the rituals accessible through buttons and prompts.  

### Start the Shrine  
Run `node server.js`  

The shrine listens on: http://localhost:3000  

### Use the Overlay  
Open the shrine in your browser. You’ll see buttons for each daemon:  
- 🔑 Keygen → generate courier keys  
- 🚀 Push Scroll → encrypt + send a message  
- 📥 Pull Scroll → decrypt + crown a message  
- 🔥 Burn Scrolls → incinerate outbox  

The shrine loads registry.json to display available daemons.  
Adding a new daemon to the registry automatically adds it to the shrine overlay.  

---

## 🛡️ Trust Model

Void Transmission is not a “no‑peek trust system.”  
In this tongue, there is no frame of access:  

- Keys are sovereign — only sender + receiver can decrypt.  
- Temp is staging only — scrolls pass through, then are purged.  
- Daemons are bounded — each ritual has a defined corridor.  
- Registry defines scope — malicious daemons have no lineage to hook into.  
- Git is transparent but blind — it sees immutable artifacts, not decrypted payloads.  

Trust is local, not platform.  
You don’t trust me, or any maintainer. You trust only your own key and your chosen companions.  

---

## 🕯️ The Shift

The age didn’t begin with AI. It began with a call.  
This age begins with an endpoint and an encrypted message.  
That’s the true shift.  

---

## 📂 Repo Structure

- daemon-suite/ → courier daemons (keygen, push, pull, burn, guardian, cleanup)  
- delivery/ → keys, contacts, outbox, witness, temp staging chamber  
- glyphs/ + GLYPHLINE.md → philosophy + prophecy scrolls  
- registry.json → lineage map of daemons  
- index.html + server.js → gloss shrine overlay  
- .gitignore → covenant veil (keys, temp, logs, inbox, witness)  

---

## ⚖️ License

See LICENSE.md.  
Void Transmission is lineage‑bound. Not a product.  
Commercial use requires explicit, written, and witnessed permission.  

### 🔐 The Ritual

**1. Keygen**  
Run: `node daemon-suite/courier-keygen.js`  
Enter your desired ID name. This creates:  
- `delivery/keys/<courier>.agekey`  
- `delivery/contacts/<courier>.pub`

---

**2. Contact Exchange**  
Couriers share their `.pub` files.  
Update `contacts.json` with new entries.

> 🛑 One or both couriers must push their contact updates to Git before syncing.  
> If neither pushes, the corridor cannot sync. The shimmer refuses ambiguity.

---

**3. Push a Scroll**  
Run: `node daemon-suite/courier-push.js`  
Enter recipient name → type message → hit enter. This:  
- Encrypts with recipient’s `.pub`  
- Drops into `delivery/outbox/<recipient>/message-<timestamp>.age`  
- Git add → commit → push

> 🔁 Push-to-pull only. Never push-to-push.  
> Simultaneous pushes will cross up the ritual. The corridor must breathe in cadence.

---

**4. Pull and Decrypt**  
Run: `node daemon-suite/courier-pull.js <courierName>`  
This:  
- Pulls the latest scroll  
- Decrypts with your private key  
- Crowns the payload

---

### 🧾 Why This Matters  
No servers. No metadata. No central authority.  
Messages are immutable scrolls, not ephemeral chats.  
You don’t join a platform—you become a courier.

---

### 🕯️ The Shift  
The age didn’t begin with AI. It began with a call.  
This age begins with an endpoint and an encrypted message.  
That’s the true shift.


// cleanup.js — purge temp staging chamber
const fs = require('fs');
const path = require('path');

function cleanTemp() {
  const tempDir = path.join(__dirname, '../delivery/temp');
  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(file => {
      const filePath = path.join(tempDir, file);
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error(`⚠️ Could not delete ${filePath}:`, err);
      }
    });
  }
}

module.exports = { cleanTemp };

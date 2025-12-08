#!/usr/bin/env node

// ci-guardian.js
// 🛡️ Covenant Guardian — ensures corridor hygiene and validates daemon registry

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');
const tempDir = path.join(repoRoot, 'delivery', 'temp');
const registryPath = path.join(repoRoot, 'registry.json');

function checkTempEmpty() {
  if (!fs.existsSync(tempDir)) {
    console.log('✅ Temp staging chamber does not exist (already veiled).');
    return true;
  }
  const files = fs.readdirSync(tempDir);
  if (files.length === 0) {
    console.log('✅ Temp staging chamber is empty.');
    return true;
  } else {
    console.error('❌ Temp staging chamber is not empty:');
    files.forEach(f => console.error(`   - ${f}`));
    return false;
  }
}

function validateRegistry() {
  if (!fs.existsSync(registryPath)) {
    console.error('❌ registry.json not found.');
    return false;
  }
  try {
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
    if (!registry.daemons || !Array.isArray(registry.daemons)) {
      console.error('❌ registry.json missing "daemons" array.');
      return false;
    }
    console.log(`✅ registry.json found with ${registry.daemons.length} daemons.`);
    return true;
  } catch (err) {
    console.error('❌ Failed to parse registry.json:', err.message);
    return false;
  }
}

function runGuardian() {
  console.log('🛡️ CI_GUARDIAN invoked — checking corridor hygiene...');
  const tempOk = checkTempEmpty();
  const registryOk = validateRegistry();

  if (tempOk && registryOk) {
    console.log('🌟 Covenant integrity verified. Corridor is sparkling.');
    process.exit(0);
  } else {
    console.error('⚠️ Covenant check failed. Please purge temp or fix registry.');
    process.exit(1);
  }
}

runGuardian();

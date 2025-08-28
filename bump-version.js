#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function bumpVersion(currentVersion, type = 'patch') {
  const [major, minor, patch] = currentVersion.split('.').map(Number);
  
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

function updatePackageJson(newVersion) {
  const packagePath = path.join(__dirname, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageData.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageData, null, 2) + '\n');
}

function updateIndexJs(newVersion) {
  const indexPath = path.join(__dirname, 'index.js');
  const content = fs.readFileSync(indexPath, 'utf8');
  const updatedContent = content.replace(
    /console\.log\("Hello world! [\d\.]+"\);/,
    `console.log("Hello world! ${newVersion}");`
  );
  fs.writeFileSync(indexPath, updatedContent);
}

function main() {
  const packagePath = path.join(__dirname, 'package.json');
  const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const currentVersion = packageData.version;
  
  const bumpType = process.argv[2] || 'patch';
  
  if (!['major', 'minor', 'patch'].includes(bumpType)) {
    console.error('Usage: node bump-version.js [major|minor|patch]');
    process.exit(1);
  }
  
  const newVersion = bumpVersion(currentVersion, bumpType);
  
  console.log(`Bumping version from ${currentVersion} to ${newVersion} (${bumpType})`);
  
  updatePackageJson(newVersion);
  updateIndexJs(newVersion);
  
  console.log('Version bumped successfully!');
}

if (require.main === module) {
  main();
}

module.exports = { bumpVersion, updatePackageJson, updateIndexJs };
#!/usr/bin/env node
// Suppress webpack-dev-server deprecation warnings
const originalEmit = process.emit;
process.emit = function (name, data, ...args) {
  if (name === 'warning' && 
      data && 
      data.name === 'DeprecationWarning' && 
      (data.message && (
        data.message.includes('webpack-dev-server') || 
        data.message.includes('DEP_WEBPACK_DEV_SERVER')
      ))) {
    // Suppress these specific warnings
    return false;
  }
  return originalEmit.apply(process, arguments);
};

// Get command line arguments (skip 'node' and script name)
let args = process.argv.slice(2);

// If no arguments or first arg is not 'start', prepend 'start'
if (args.length === 0 || (args[0] !== 'start' && !args[0].startsWith('--'))) {
  args = ['start', ...args];
}

// Use spawn to run expo CLI
const { spawn } = require('child_process');
const path = require('path');

// Find expo CLI
const expoPath = path.join(__dirname, 'node_modules', '.bin', 'expo');

// Spawn expo with arguments
const expo = spawn(expoPath, args, {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

expo.on('error', (err) => {
  console.error('Failed to start Expo:', err);
  process.exit(1);
});

expo.on('exit', (code) => {
  process.exit(code || 0);
});


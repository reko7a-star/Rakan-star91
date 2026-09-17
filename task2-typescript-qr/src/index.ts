#!/usr/bin/env node

import QRCode from 'qrcode';

type Options = { text: string; size: number };

function printHelp(): void {
  console.log('Usage: qrgen generate <text> [--size <number>]');
  console.log('Example: qrgen generate "Hello world" --size 8');
}

function parseArgs(args: string[]): Options {
  if (args[0] !== 'generate' || !args[1]) {
    throw new Error('Use: generate <text> [--size <number>]');
  }

  let text = args[1];
  let size = 4;

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '--size') {
      const value = Number(args[++i]);
      if (!Number.isInteger(value) || value < 1 || value > 32) {
        throw new Error('--size must be an integer from 1 to 32');
      }
      size = value;
    } else {
      throw new Error(`Unknown option: ${args[i]}`);
    }
  }

  return { text, size };
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp();
    return;
  }

  const { text, size } = parseArgs(args);
  const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const modules = qr.modules;
  const n = modules.size;
  const quiet = 2;
  const cell = '██';
  const blank = '  ';

  console.log(`\nQR (${n}x${n}), scale ${size}\n`);
  for (let y = -quiet; y < n + quiet; y++) {
    let line = '';
    for (let x = -quiet; x < n + quiet; x++) {
      const dark = x >= 0 && y >= 0 && x < n && y < n && modules.get(x, y);
      line += dark ? cell.repeat(size) : blank.repeat(size);
    }
    console.log(line);
  }
}

main().catch((error: unknown) => {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});

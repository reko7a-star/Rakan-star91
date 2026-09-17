# TypeScript QR Generator

CLI QR-code generator using the `qrcode` package.

## Install and build

```bash
npm install
npm run build
```

## Usage

```bash
node dist/index.js generate "Hello world"
node dist/index.js generate "https://example.com" --size 6
```

The CLI validates the command and size, prints the QR code directly in the terminal, and reports invalid arguments with a clear error.

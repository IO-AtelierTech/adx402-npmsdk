# Adx402 SDK

> Vanilla JavaScript SDK for frictionless, on-chain advertising via [Adx402](https://github.com/IO-AtelierTech/adx402-npmsdk)

[![npm](https://img.shields.io/npm/v/@ateliertech/adx402-sdk)](https://www.npmjs.com/package/@ateliertech/adx402-sdk)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Adx402 SDK enables web publishers to embed dynamic, rewarded ads powered by the Adx402 protocol — built on Solana + x402 — without requiring users to create accounts or wallets.

---

## Features

- Lightweight, framework-agnostic (Vanilla JS)
- Configurable ad targeting (tags, aspect ratio)
- No cookies or signups, wallet as identity
- Impression and click tracking with fraud protection

---

## Installation

```bash
npm install @ateliertech/adx402-sdk
```

Or include directly in a webpage:

```html
<script src="https://unpkg.com/@ateliertech/adx402-sdk/dist/adx402.umd.js"></script>
```

## Usage

```html
<div id="adx-slot"></div>

<script type="module">
  import { adx402 } from '@ateliertech/adx402-sdk';

  adx402.init({
    wallet: 'F1a2b3...c9D0',           // Publisher wallet
    tags: ['tech', 'gaming']           // Optional targeting tags
  });

  adx402.render('#adx-slot', {
    aspectRatio: '16x9',                // Optional (defaults to '16x9')
    fallback: '/img/ad-placeholder.png' // Optional fallback image
  });
</script>
```

The render() call fetches a matched ad from the backend, displays it as an image, and tracks verified impressions and clicks.

## Development

```bash
npm install
npm run dev      # Start local dev
npm run build    # Compile for production
```

## License

MIT © IO AtelierTech
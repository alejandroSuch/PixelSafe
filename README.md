# PixelSafe

**Optimize and resize your images privately, directly in your browser.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy](https://github.com/alejandroSuch/PixelSafe/actions/workflows/deploy.yml/badge.svg)](https://github.com/alejandroSuch/PixelSafe/actions/workflows/deploy.yml)

---

## Privacy

PixelSafe processes your images **100% in your browser**. No image data is ever uploaded to any server. All optimization and resizing happens locally using the Canvas API and Web Workers. Your files never leave your device.

This is the core principle behind PixelSafe — you shouldn't have to trust a third party with your photos just to make them smaller.

## Features

- **Drag & drop** or select multiple images at once
- **Batch optimization** with quality control (JPEG, PNG, WebP)
- **Resize options**: by width, height, percentage, or max dimension
- **Side-by-side comparison** with savings percentage
- **Download individually** or as a ZIP archive
- **Multi-language**: English, Spanish, French, Italian, Portuguese, German, Czech
- **Automatic language detection** based on your browser settings
- **Mobile-friendly** responsive design
- **Zero backend** — works offline after first load

## Getting Started

```bash
git clone git@github.com:alejandroSuch/PixelSafe.git
cd PixelSafe
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

The output will be in the `dist/` directory.

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve a translation:

1. [Open an issue](https://github.com/alejandroSuch/PixelSafe/issues) describing the problem or idea
2. Fork the repo and create a branch from `main`
3. Make your changes and open a pull request

### Translation improvements

Translation files are in `src/i18n/locales/`. Feel free to open a PR to fix translations or add new languages.

## Support

If you find PixelSafe useful, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?logo=buymeacoffee&logoColor=white)](https://buymeacoffee.com/alejandrosuch)

## License

[MIT](LICENSE)

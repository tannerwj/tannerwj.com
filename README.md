# Tanner Johnson - Personal Website

A modern, responsive personal website for Tanner Johnson, Systems Architect & Programmer.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Cloudflare account

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd tannerwj-com
```

2. Install dependencies:
```bash
npm install
```

3. Login to Cloudflare:
```bash
npx wrangler auth login
```

## 📦 Deployment to Cloudflare Workers

### Using Wrangler CLI (Recommended)

1. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

2. Or use the direct command:
```bash
npx wrangler deploy
```

3. Follow the prompts to:
   - Select your Cloudflare account
   - Choose a Worker name (e.g., `tannerwj-com`)
   - Set up your custom domain (`tannerwj.com`)

### Alternative: Manual Deployment

1. Login to Cloudflare:
```bash
npx wrangler auth login
```

2. Deploy:
```bash
npx wrangler deploy
```

## 🛠️ Development

### Local Development
```bash
npm run dev
```

### Preview Build
```bash
npm run preview
```

## 📁 Project Structure

```
tannerwj-com/
├── public/             # Static assets
│   ├── index.html      # Main HTML file
│   ├── style.css       # Stylesheet
│   └── script.js       # JavaScript functionality
├── src/
│   └── index.js        # Cloudflare Worker script
├── wrangler.toml       # Cloudflare configuration
├── package.json        # Node.js dependencies
└── README.md           # This file
```

## 🎨 Features

- **Modern Design**: Clean, responsive layout with modern CSS
- **Dark Theme**: Professional dark theme with accent colors
- **Interactive Elements**: Hover effects and smooth animations
- **Mobile Responsive**: Optimized for all device sizes
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Fast Loading**: Optimized for performance

## 🔧 Customization

### Colors
The site uses CSS custom properties for easy color customization. Main colors are defined in `:root` in `style.css`.

### Content
Edit the HTML in `index.html` to update:
- Personal information
- Project links
- Skills and expertise
- Referral links

### Styling
Modify `style.css` to customize:
- Color scheme
- Typography
- Layout and spacing
- Animations and effects

## 🌐 Domain Setup

1. In Cloudflare Dashboard, go to **Workers & Pages**
2. Select your Worker (tannerwj-com)
3. Go to **Triggers** tab
4. Click **Add Custom Domain**
5. Add `tannerwj.com` as a custom domain
6. Follow Cloudflare's DNS setup instructions

## 📊 Performance

This site is optimized for:
- Fast loading times
- SEO best practices
- Mobile performance
- Accessibility

## 🤝 Contributing

This is a personal website project. For suggestions or improvements, please create an issue or submit a pull request.

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ by Tanner Johnson**

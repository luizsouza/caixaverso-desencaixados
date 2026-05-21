const fs = require('fs');
const path = require('path');

const extensionDir = path.join(__dirname, '../extension');
const iconsDir = path.join(extensionDir, 'icons');
const popupDir = path.join(extensionDir, 'popup');
const browserDir = path.join(popupDir, 'browser');
const popupHtmlPath = path.join(popupDir, 'index.html');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

//Copy logo to icons directory
const logoPath = path.join(__dirname, '../public/logo/logo.png');
const logoBuffer = fs.readFileSync(logoPath);
fs.writeFileSync(path.join(iconsDir, 'icon16.png'), logoBuffer);
fs.writeFileSync(path.join(iconsDir, 'icon48.png'), logoBuffer);
fs.writeFileSync(path.join(iconsDir, 'icon128.png'), logoBuffer);

// Copy extension core files from chrome/ directory to extension/
const chromeDir = path.join(__dirname, '../chrome');
if (fs.existsSync(chromeDir)) {
    const chromeFiles = fs.readdirSync(chromeDir);
    for (const file of chromeFiles) {
        const srcPath = path.join(chromeDir, file);
        const destPath = path.join(extensionDir, file);
        if (fs.lstatSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Move files from browser/ to popup/ if necessary (Angular 17+ application builder)
if (fs.existsSync(browserDir)) {
    const files = fs.readdirSync(browserDir);
    for (const file of files) {
        fs.renameSync(path.join(browserDir, file), path.join(popupDir, file));
    }
    fs.rmdirSync(browserDir);
}

// Check if popup/index.html exists
if (fs.existsSync(popupHtmlPath)) {
    console.log('✅ Build successful. The extension is ready in the /extension folder.');
} else {
    console.error('❌ Build failed. Could not find extension/popup/index.html');
    process.exit(1);
}

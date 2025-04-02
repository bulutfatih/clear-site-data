# Clear Site Data Extension

A simple Chrome extension that clears site data for the current tab when you click on the extension icon.

## Features

- Clears site data for the current tab only
- Asks for confirmation before clearing data
- Uses minimal permissions (activeTab, browsingData, and notifications)
- Simple popup UI for confirmation

## Building and Installing

1. Clone this repository
2. Add your own icon files in the `icons` directory
3. Run `npm run build` to build the extension
4. Run `npm run zip` to create a zip file for upload to Chrome Web Store
5. For local testing, open Chrome, go to `chrome://extensions/`, enable Developer Mode, and click "Load unpacked" to select the `dist` directory

## Usage

1. Navigate to a website
2. Click the extension icon to open the popup
3. Click "Clear Data" to confirm and clear the site data
4. A notification will appear when the data has been cleared

## Permissions

- `activeTab`: Used to get the URL of the current tab
- `browsingData`: Used to clear the site data
- `notifications`: Used to show a notification when clearing is complete

## License

MIT 
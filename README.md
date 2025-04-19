# Clear Site Data Extension

A Chrome extension that clears site data for the current tab with customizable options.

<a href="https://chromewebstore.google.com/detail/clear-site-data/clanojgiikkagjnhcfimllpmdhooedja">
  <img src="https://user-images.githubusercontent.com/22908993/166417152-f870bfbd-1770-4c28-b69d-a7303aebc9a6.png" alt="Chrome web store" />
  <p>Chrome Web Store</p>
</a>

## Features

- Clears site data for the current tab only
- Allows selecting which types of data to clear
- Remembers your preferences for next use
- Shows clearing status
- Supports dark mode and light mode (follows system preference)
- Simple UI

## Building and Installing

1. Clone this repository
2. Add your own icon files in the `icons` directory
3. Run `npm run build` to build the extension
4. Run `npm run zip` to create a zip file for upload to Chrome Web Store
5. For local testing, open Chrome, go to `chrome://extensions/`, enable Developer Mode, and click "Load unpacked" to select the `dist` directory

## Usage

1. Navigate to a website
2. Click the extension icon to open the popup
3. Select which data types you want to clear (or use Select All)
4. Click "Clear Data" to clear the selected site data
5. The popup will show a status indicating success or failure

## Data Types

The extension can clear the following types of site data:

- Cache
- Cache Storage
- Cookies
- IndexedDB
- Local Storage
- Service Workers

## Permissions

- `activeTab`: Used to get the URL of the current tab
- `browsingData`: Used to clear the site data
- `storage`: Used to remember your preferences

## License

MIT

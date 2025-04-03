# Privacy Policy for Clear Site Data Extension

## Overview

The "Clear Site Data" extension is designed with privacy as a core principle. This document outlines our commitment to protecting your privacy and explains exactly what data our extension accesses, stores, and how it's used.

## Data Collection and Usage

### What we DO collect and store

- **User Preferences**: We store your selected preferences for which types of site data you want to clear (cookies, cache, local storage, etc.). This data is stored locally on your device using Chrome's storage API and is never transmitted to any external servers.

### What we DO NOT collect

- **Browsing History**: We do not track, collect, or store information about your browsing habits, history, or the websites you visit.
- **Personal Information**: We do not collect any personally identifiable information.
- **Website Content**: We do not access, analyze, or store the content of websites you visit.
- **Cookies or Site Data**: While our extension helps you clear cookies and site data for specific domains, we do not access, read, or store this information.

## How We Use Data

The only data we store (your clearing preferences) is used exclusively to:

1. Remember your preferred settings between uses of the extension
2. Provide a consistent user experience when using the extension

## Data Storage

All user preferences are stored locally on your device using Chrome's built-in `storage.local` API. This data never leaves your device and is not accessible to us or any third parties.

## Third-Party Access

We do not share any data with third parties because:

- We don't collect any data beyond local preferences
- We don't use any external services, analytics, or APIs
- All operations occur locally within your browser

## Permissions Explained

Our extension requests the following permissions, and here's why we need them:

- **activeTab**: Allows us to get the URL of the current tab so we can clear data for that specific origin.
- **browsingData**: Required to clear site data like cookies, cache, and local storage.
- **storage**: Used to save your preferences locally so they persist between uses.

## Updates to Privacy Policy

If we make any changes to this privacy policy, we will update the document and notify users with the extension's update notes.

## Contact

If you have any questions or concerns about our privacy practices, please open an issue on our GitHub repository or contact us at [your contact information].

**Last Updated**: 03.04.2025

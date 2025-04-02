// Listen for clicks on the extension icon
chrome.action.onClicked.addListener((tab) => {
  if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    // Show confirmation dialog
    if (confirm(`Clear site data for ${new URL(tab.url).hostname}?`)) {
      clearSiteData(tab);
    }
  } else {
    // For browser pages where we can't clear data
    alert("Cannot clear data for browser pages");
  }
});

// Function to clear site data for a specific tab
function clearSiteData(tab) {
  const url = new URL(tab.url);
  const origin = url.origin;

  chrome.browsingData.remove(
    {
      origins: [origin],
    },
    {
      cache: true,
      cookies: true,
      localStorage: true,
      indexedDB: true,
      serviceWorkers: true,
      cacheStorage: true,
    },
    () => {
      // Show success notification
      alert(`Site data cleared for ${url.hostname}`);
    }
  );
}

// Listen for messages from the popup
chrome.runtime.onMessage?.addListener((message, sender, sendResponse) => {
  if (message.action === "clearCompleted") {
    // Show notification that data was cleared
    chrome.notifications?.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "Clear Site Data",
      message: `Site data cleared for ${message.hostname}`,
    });
  }
});

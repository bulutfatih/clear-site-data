document.addEventListener("DOMContentLoaded", async () => {
  // Get current tab info
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const messageElement = document.getElementById("message");
  const confirmButton = document.getElementById("confirm");
  const cancelButton = document.getElementById("cancel");

  // Check if we can clear data for this tab
  if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
    messageElement.textContent = "Cannot clear data for browser pages";
    confirmButton.disabled = true;
    return;
  }

  // Show hostname in message
  const hostname = new URL(tab.url).hostname;
  messageElement.textContent = `Clear site data for ${hostname}?`;

  // Handle confirm button click
  confirmButton.addEventListener("click", () => {
    clearSiteData(tab);
    window.close();
  });

  // Handle cancel button click
  cancelButton.addEventListener("click", () => {
    window.close();
  });
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
      cacheStorage: true,
      cookies: true,
      webSQL: true,
      indexedDB: true,
      localStorage: true,
      serviceWorkers: true,
      fileSystems: true,
    },
    () => {
      // Send message to background script for notification
      chrome.runtime.sendMessage({
        action: "clearCompleted",
        hostname: url.hostname,
      });
    }
  );
}

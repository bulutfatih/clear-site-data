document.addEventListener("DOMContentLoaded", async () => {
  const POPUP_CLOSE_DELAY = 1500;
  const STATUS_HIDE_DELAY = 5000;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const hostnameElement = document.getElementById("hostname");
  const clearButton = document.getElementById("clear");
  const statusElement = document.getElementById("status");
  const selectAllButton = document.getElementById("selectAll");
  const refreshButton = document.getElementById("refreshButton");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // Initially hide the refresh button
  hideRefreshButton();

  // Handle browser pages that don't allow data clearing
  if (tab.url.startsWith("chrome://") || tab.url.startsWith("edge://")) {
    hostnameElement.textContent = "Cannot clear data for browser pages";
    clearButton.disabled = true;
    checkboxes.forEach((checkbox) => (checkbox.disabled = true));
    return;
  }

  const hostname = new URL(tab.url).hostname;
  hostnameElement.textContent = hostname;

  loadSavedPreferences();

  // Set up event listeners
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", savePreferences);
  });

  selectAllButton.addEventListener("click", () => {
    const allChecked = Array.from(checkboxes).every(
      (checkbox) => checkbox.checked
    );

    checkboxes.forEach((checkbox) => {
      checkbox.checked = !allChecked;
    });

    updateSelectAllButtonText(checkboxes, selectAllButton);
    savePreferences();
  });

  updateSelectAllButtonText(checkboxes, selectAllButton);

  clearButton.addEventListener("click", async () => {
    clearButton.disabled = true;
    hideRefreshButton();
    showStatus("Clearing data...", "loading", statusElement, STATUS_HIDE_DELAY);

    try {
      await clearSiteData(tab);
      showStatus(
        "Data cleared successfully!",
        "success",
        statusElement,
        STATUS_HIDE_DELAY
      );
      showRefreshButton();
    } catch (error) {
      showStatus(
        `Error: ${error.message}`,
        "error",
        statusElement,
        STATUS_HIDE_DELAY
      );
    } finally {
      clearButton.disabled = false;
    }
  });

  // Setup refresh button click handler
  refreshButton.addEventListener("click", () => {
    chrome.tabs.reload(tab.id);
    window.close();
  });

  // Close popup when clicking outside
  document.addEventListener(
    "click",
    (event) => {
      if (event.target.closest("body")) {
        return;
      }
      window.close();
    },
    true
  );

  // Helper functions
  function savePreferences() {
    const preferences = {};
    checkboxes.forEach((checkbox) => {
      preferences[checkbox.id] = checkbox.checked;
    });
    chrome.storage.local.set({ dataTypePreferences: preferences });
  }

  function loadSavedPreferences() {
    chrome.storage.local.get("dataTypePreferences", (result) => {
      if (result.dataTypePreferences) {
        const preferences = result.dataTypePreferences;
        Object.keys(preferences).forEach((id) => {
          const checkbox = document.getElementById(id);
          if (checkbox) {
            checkbox.checked = preferences[id];
          }
        });
        updateSelectAllButtonText(checkboxes, selectAllButton);
      }
    });
  }

  function showRefreshButton() {
    refreshButton.classList.remove("hidden");
  }

  function hideRefreshButton() {
    refreshButton.classList.add("hidden");
  }
});

function updateSelectAllButtonText(checkboxes, selectAllButton) {
  const allChecked = Array.from(checkboxes).every(
    (checkbox) => checkbox.checked
  );
  selectAllButton.textContent = allChecked ? "Deselect All" : "Select All";
}

function showStatus(message, type, statusElement, hideDelay) {
  statusElement.textContent = message;
  statusElement.classList.add(type);
  statusElement.classList.remove("hidden");

  if (type !== "loading") {
    statusElement.classList.remove("loading");
    setTimeout(() => {
      statusElement.classList.toggle("hidden", true);
    }, hideDelay);
  }
}

function clearSiteData(tab) {
  return new Promise((resolve, reject) => {
    const url = new URL(tab.url);
    const origin = url.origin;
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const dataToRemove = {};
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        dataToRemove[checkbox.id] = true;
      }
    });

    if (Object.keys(dataToRemove).length === 0) {
      reject(new Error("Please select at least one data type to clear"));
      return;
    }

    try {
      chrome.browsingData.remove(
        {
          origins: [origin],
        },
        dataToRemove,
        () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

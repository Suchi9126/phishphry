// Save data to localStorage
function setStore(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        console.log(`✓ Saved ${key}:`, value);
    } catch (e) {
        console.error('Save failed:', e);
    }
}

// Load data from localStorage
function getStore(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
    } catch (e) {
        console.error('Load failed:', e);
        return defaultValue;
    }
}

// Clear all game data (for testing)
function clearStore() {
    localStorage.clear();
    console.log('✓ All data cleared');
}

/**
 * Handles Dark/Light mode switching and persistence
 */

export function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const userTheme = localStorage.getItem('theme');
    
    // Apply theme on load
    if (userTheme === 'dark' || (!userTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

export function setTheme(theme) {
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        if (themeToggle) themeToggle.textContent = 'Light Mode';
    } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        if (themeToggle) themeToggle.textContent = 'Dark Mode';
    }
    
    // Dispatch event for any other components that need to know
    window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme } }));
}

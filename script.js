// Basic JavaScript for interactivity
// Add any dynamic features here

document.addEventListener('DOMContentLoaded', function() {
    console.log('SDA Website loaded');

    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    function updateThemeButton() {
        if (!themeToggle) return;
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.classList.toggle('dark', isDark);
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateThemeButton();
        });
    }

    // Handle contact form submission
    const contactForm = document.querySelector('#contact-form-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Advanced search functionality
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchForm.query.value.toLowerCase().trim();
            if (query) {
                performSearch(query);
            }
        });
    }

    // News Category Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsPosts = document.querySelectorAll('[data-category]');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Show/hide posts based on filter
                newsPosts.forEach(post => {
                    if (filterValue === 'all') {
                        post.style.display = 'block';
                    } else if (post.getAttribute('data-category') === filterValue) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }

    function performSearch(query) {
        // Simple search on current page
        const bodyText = document.body.textContent.toLowerCase();
        const results = [];

        // Search for query in page content
        if (bodyText.includes(query)) {
            results.push({
                title: document.title,
                url: window.location.href,
                snippet: getSnippet(bodyText, query)
            });
        }

        // For advanced search, we could load other pages, but for now, redirect to search page
        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    }

    function getSnippet(text, query) {
        const index = text.indexOf(query);
        const start = Math.max(0, index - 50);
        const end = Math.min(text.length, index + query.length + 50);
        return text.substring(start, end).replace(new RegExp(query, 'gi'), '<mark>$&</mark>');
    }

    // Display search results on search page
    if (window.location.pathname.includes('search.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            document.getElementById('query-text').textContent = query;

            // Mock search results - in a real implementation, this would search all pages
            const mockResults = [
                { title: 'About the SDA Church', url: 'about.html', snippet: 'The Seventh-day Adventist Church is a Christian denomination committed to sharing the gospel...' },
                { title: 'Beliefs & Doctrines', url: 'beliefs.html', snippet: 'Our beliefs are rooted in the Bible and center on Jesus Christ...' },
                { title: 'Worship & Lifestyle', url: 'worship.html', snippet: 'Experience the joy of Sabbath worship and discover a lifestyle...' }
            ].filter(result => result.snippet.toLowerCase().includes(query.toLowerCase()));

            const resultsDiv = document.getElementById('results');
            if (mockResults.length > 0) {
                resultsDiv.innerHTML = '<h3>Search Results:</h3>' +
                    mockResults.map(result =>
                        `<div class="search-result">
                            <h4><a href="${result.url}">${result.title}</a></h4>
                            <p>${result.snippet}</p>
                        </div>`
                    ).join('');
            } else {
                resultsDiv.innerHTML = '<p>No results found. Try different keywords or browse our site sections.</p>';
            }
        }
    }
});
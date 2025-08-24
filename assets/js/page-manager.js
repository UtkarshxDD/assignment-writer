// Multi-page Management System
class PageManager {
    constructor() {
        this.pages = [this.createNewPageData()]; // Start with one page
        this.currentPageIndex = 0;
        this.maxCharsPerPage = 800; // Approximate characters per page
        this.initializePageManagement();
    }

    // Create new page data structure
    createNewPageData() {
        return {
            text: '',
            xaxis: 20,
            yaxis: 20,
            fontsize: 30,
            width: 700,
            linespacing: 30,
            backgroundImage: null
        };
    }

    // Initialize page management
    initializePageManagement() {
        this.updatePageIndicator();
        this.updateNavigationButtons();
    }

    // Add a new page
    addPage() {
        const newPage = this.createNewPageData();
        // Copy current page settings to new page
        if (this.pages[this.currentPageIndex]) {
            const currentPage = this.pages[this.currentPageIndex];
            newPage.xaxis = currentPage.xaxis;
            newPage.yaxis = currentPage.yaxis;
            newPage.fontsize = currentPage.fontsize;
            newPage.width = currentPage.width;
            newPage.linespacing = currentPage.linespacing;
            newPage.backgroundImage = currentPage.backgroundImage;
        }
        
        this.pages.push(newPage);
        this.currentPageIndex = this.pages.length - 1;
        this.updatePageIndicator();
        this.updateNavigationButtons();
        this.loadCurrentPage();
        
        console.log(`Added new page. Total pages: ${this.pages.length}`);
    }

    // Delete current page (if more than one page exists)
    deletePage() {
        if (this.pages.length <= 1) {
            alert('Cannot delete the last page');
            return;
        }

        if (confirm(`Are you sure you want to delete page ${this.currentPageIndex + 1}?`)) {
            this.pages.splice(this.currentPageIndex, 1);
            
            // Adjust current page index
            if (this.currentPageIndex >= this.pages.length) {
                this.currentPageIndex = this.pages.length - 1;
            }
            
            this.updatePageIndicator();
            this.updateNavigationButtons();
            this.loadCurrentPage();
            
            console.log(`Deleted page. Total pages: ${this.pages.length}`);
        }
    }

    // Navigate to a different page
    navigatePage(direction) {
        // Save current page data
        this.saveCurrentPageData();
        
        const newIndex = this.currentPageIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.pages.length) {
            this.currentPageIndex = newIndex;
            this.loadCurrentPage();
            this.updatePageIndicator();
            this.updateNavigationButtons();
        }
    }

    // Save current page data from UI elements
    saveCurrentPageData() {
        if (!this.pages[this.currentPageIndex]) return;
        
        const currentPage = this.pages[this.currentPageIndex];
        const dataField = document.getElementById('dataField');
        
        if (dataField) {
            currentPage.text = dataField.value;
        }
        
        // Save current canvas settings
        currentPage.xaxis = typeof xaxis !== 'undefined' ? xaxis : 20;
        currentPage.yaxis = typeof yaxis !== 'undefined' ? yaxis : 20;
        currentPage.fontsize = typeof fontsize !== 'undefined' ? fontsize : 30;
        currentPage.width = typeof w !== 'undefined' ? w : 700;
        currentPage.linespacing = typeof linespacing !== 'undefined' ? linespacing : 30;
        
        // Save background image if available
        if (typeof img !== 'undefined') {
            currentPage.backgroundImage = img;
        }
    }

    // Load current page data to UI elements
    loadCurrentPage() {
        if (!this.pages[this.currentPageIndex]) return;
        
        const currentPage = this.pages[this.currentPageIndex];
        
        // Load text to textarea
        const dataField = document.getElementById('dataField');
        if (dataField) {
            dataField.value = currentPage.text || '';
        }
        
        // Update global variables for p5.js
        if (typeof updateGlobalVariables === 'function') {
            updateGlobalVariables(currentPage);
        } else {
            // Fallback direct assignment
            if (typeof window.myData !== 'undefined') window.myData = currentPage.text || '';
            if (typeof window.xaxis !== 'undefined') window.xaxis = currentPage.xaxis;
            if (typeof window.yaxis !== 'undefined') window.yaxis = currentPage.yaxis;
            if (typeof window.fontsize !== 'undefined') window.fontsize = currentPage.fontsize;
            if (typeof window.w !== 'undefined') window.w = currentPage.width;
            if (typeof window.linespacing !== 'undefined') window.linespacing = currentPage.linespacing;
        }
        
        // Update UI sliders
        this.updateSliders(currentPage);
        
        // Load background image
        if (currentPage.backgroundImage && typeof window.img !== 'undefined') {
            window.img = currentPage.backgroundImage;
        }
    }

    // Update slider values in UI
    updateSliders(pageData) {
        const sliders = [
            { id: 'xaxis', value: pageData.xaxis, property: 'xaxis' },
            { id: 'yaxis', value: pageData.yaxis, property: 'yaxis' },
            { id: 'fontsize', value: pageData.fontsize, property: 'fontsize' },
            { id: 'width', value: pageData.width, property: 'width' },
            { id: 'linespacing', value: pageData.linespacing, property: 'linespacing' }
        ];

        sliders.forEach(slider => {
            const sliderElement = document.querySelector(`input[oninput*="${slider.property}"]`);
            if (sliderElement) {
                sliderElement.value = slider.value;
            }
        });
    }

    // Update page indicator display
    updatePageIndicator() {
        const indicator = document.getElementById('pageIndicator');
        if (indicator) {
            indicator.textContent = `Page ${this.currentPageIndex + 1} of ${this.pages.length}`;
        }
    }

    // Update navigation button states
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevPageBtn');
        const nextBtn = document.getElementById('nextPageBtn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPageIndex === 0;
        }
        
        if (nextBtn) {
            nextBtn.disabled = this.currentPageIndex === this.pages.length - 1;
        }
    }

    // Reset to single page
    resetToSinglePage() {
        this.pages = [this.createNewPageData()];
        this.currentPageIndex = 0;
        this.updatePageIndicator();
        this.updateNavigationButtons();
        this.loadCurrentPage();
    }

    // Distribute text across multiple pages
    async distributeTextAcrossPages(fullText) {
        if (!fullText) return;
        
        // Reset to single page first
        this.resetToSinglePage();
        
        // Calculate approximate text distribution
        const textChunks = this.splitTextIntoChunks(fullText);
        
        // Create pages for each chunk
        for (let i = 0; i < textChunks.length; i++) {
            if (i === 0) {
                // Update first page
                this.pages[0].text = textChunks[i];
            } else {
                // Add new pages
                this.addPage();
                this.pages[this.currentPageIndex].text = textChunks[i];
            }
        }
        
        // Go back to first page
        this.currentPageIndex = 0;
        this.loadCurrentPage();
        this.updatePageIndicator();
        this.updateNavigationButtons();
        
        console.log(`Text distributed across ${this.pages.length} pages`);
    }

    // Split text into chunks that fit on pages
    splitTextIntoChunks(text) {
        const words = text.split(' ');
        const chunks = [];
        let currentChunk = '';
        
        for (const word of words) {
            const testChunk = currentChunk + (currentChunk ? ' ' : '') + word;
            
            // Check if adding this word would exceed page capacity
            if (testChunk.length > this.maxCharsPerPage && currentChunk) {
                chunks.push(currentChunk.trim());
                currentChunk = word;
            } else {
                currentChunk = testChunk;
            }
        }
        
        // Add the last chunk if it exists
        if (currentChunk.trim()) {
            chunks.push(currentChunk.trim());
        }
        
        return chunks.length > 0 ? chunks : [text];
    }

    // Check if text needs multiple pages
    async checkIfTextNeedsMultiplePages(text) {
        return text.length > this.maxCharsPerPage;
    }

    // Download all pages
    async downloadAllPages() {
        const originalPage = this.currentPageIndex;
        
        for (let i = 0; i < this.pages.length; i++) {
            this.currentPageIndex = i;
            this.loadCurrentPage();
            
            // Wait a bit for the canvas to update
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Download current page
            if (typeof save === 'function') {
                save(`assignment_page_${i + 1}`);
            }
        }
        
        // Return to original page
        this.currentPageIndex = originalPage;
        this.loadCurrentPage();
        
        alert(`Downloaded ${this.pages.length} pages successfully!`);
    }

    // Get current page count
    getPageCount() {
        return this.pages.length;
    }

    // Get current page index
    getCurrentPageIndex() {
        return this.currentPageIndex;
    }

    // Get current page data
    getCurrentPage() {
        return this.pages[this.currentPageIndex];
    }
}

// Initialize page manager
let pageManager;

// Function to be called after page load
function initializePageManager() {
    pageManager = new PageManager();
    console.log('Page Manager initialized');
}

// Global functions for UI interaction
function navigatePage(direction) {
    if (pageManager) {
        pageManager.navigatePage(direction);
    }
}

function addNewPage() {
    if (pageManager) {
        pageManager.addPage();
    }
}

function deletePage() {
    if (pageManager) {
        pageManager.deletePage();
    }
}

function downloadAllPages() {
    if (pageManager) {
        pageManager.downloadAllPages();
    }
}

// Helper functions for integration with existing code
function resetToSinglePage() {
    if (pageManager) {
        pageManager.resetToSinglePage();
    }
}

function distributeTextAcrossPages(text) {
    if (pageManager) {
        return pageManager.distributeTextAcrossPages(text);
    }
}

function checkIfTextNeedsMultiplePages(text) {
    if (pageManager) {
        return pageManager.checkIfTextNeedsMultiplePages(text);
    }
    return Promise.resolve(false);
}

function updatePageIndicator() {
    if (pageManager) {
        pageManager.updatePageIndicator();
    }
}

// Update global variables function for p5.js integration
function updateGlobalVariables(pageData) {
    if (typeof window.myData !== 'undefined') window.myData = pageData.text || '';
    if (typeof window.xaxis !== 'undefined') window.xaxis = pageData.xaxis;
    if (typeof window.yaxis !== 'undefined') window.yaxis = pageData.yaxis;
    if (typeof window.fontsize !== 'undefined') window.fontsize = pageData.fontsize;
    if (typeof window.w !== 'undefined') window.w = pageData.width;
    if (typeof window.linespacing !== 'undefined') window.linespacing = pageData.linespacing;
}

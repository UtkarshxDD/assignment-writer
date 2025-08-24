window.onload = function () {
    runOnLoad()
    // Initialize page manager after everything else is loaded
    setTimeout(() => {
        if (typeof initializePageManager === 'function') {
            initializePageManager();
        }
        // Setup auto-save for API key
        if (typeof setupAutoSave === 'function') {
            setupAutoSave();
        }
        // Initialize formatting controls with current global values
        initializeFormatting();
        
        // Add helpful tooltips and instructions
        initializeTooltips();
    }, 100);
};

// Dark mode functionality removed per user request

 function initializeTooltips() {
    // Add helpful placeholder text improvements
    const topicField = document.getElementById('topicField');
    if (topicField && !topicField.value) {
        const placeholders = [
            "The Impact of Climate Change on Global Agriculture",
            "Analysis of Shakespeare's Hamlet: Themes and Characters",
            "The Role of Artificial Intelligence in Modern Healthcare",
            "Economic Effects of Social Media on Small Businesses",
            "Historical Significance of the Industrial Revolution"
        ];
        const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
        topicField.placeholder = randomPlaceholder;
    }

    // Add Enter key support for generation
    if (topicField) {
        topicField.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                generateAssignment();
            }
        });
    }

    // Show helpful instructions if no API key is saved
    if (!localStorage.hasOwnProperty("geminiApiKey")) {
        const apiKeyField = document.getElementById('apiKey');
        if (apiKeyField) {
            apiKeyField.style.borderColor = '#ffc107';
            apiKeyField.style.borderWidth = '2px';
        }
    }
 }

 // Formatting control functions
 function updateXAxis(value) {
    window.xaxis = parseFloat(value);
    document.getElementById('xValue').textContent = value;
    console.log('X axis updated to:', window.xaxis);
    updateCurrentPageSettings();
 }

 function updateYAxis(value) {
    window.yaxis = parseFloat(value);
    document.getElementById('yValue').textContent = value;
    console.log('Y axis updated to:', window.yaxis);
    updateCurrentPageSettings();
 }

 function updateFontSize(value) {
    window.fontsize = parseFloat(value);
    document.getElementById('fontSizeValue').textContent = value;
    console.log('Font size updated to:', window.fontsize);
    updateCurrentPageSettings();
 }

 function updateWidth(value) {
    window.w = parseFloat(value);
    document.getElementById('widthValue').textContent = value;
    console.log('Width updated to:', window.w);
    updateCurrentPageSettings();
 }

 function updateLineSpacing(value) {
    window.linespacing = parseFloat(value);
    document.getElementById('lineSpacingValue').textContent = value;
    console.log('Line spacing updated to:', window.linespacing);
    updateCurrentPageSettings();
 }

 // Update current page settings in page manager
 function updateCurrentPageSettings() {
    if (typeof pageManager !== 'undefined' && pageManager) {
        pageManager.saveCurrentPageData();
    }
}

// Update manual text input and sync with page manager
function updateManualText(text) {
    // Update global variable for p5.js
    if (typeof window.myData !== 'undefined') {
        window.myData = text;
    }
    
    // Update page manager if available
    if (typeof pageManager !== 'undefined' && pageManager) {
        const currentPage = pageManager.getCurrentPage();
        if (currentPage) {
            currentPage.text = text;
        }
        
        // Check if text needs to be split across pages
        if (typeof checkAndCreatePagesForText === 'function') {
            checkAndCreatePagesForText(text);
        }
    }
}

// Initialize formatting controls with current global values
function initializeFormatting() {
    // Update slider values and displays to match current global variables
    if (typeof window.xaxis !== 'undefined') {
        const slider = document.getElementById('xAxisSlider');
        const display = document.getElementById('xValue');
        if (slider) slider.value = window.xaxis;
        if (display) display.textContent = window.xaxis;
    }
    if (typeof window.yaxis !== 'undefined') {
        const slider = document.getElementById('yAxisSlider');
        const display = document.getElementById('yValue');
        if (slider) slider.value = window.yaxis;
        if (display) display.textContent = window.yaxis;
    }
    if (typeof window.fontsize !== 'undefined') {
        const slider = document.getElementById('fontSizeSlider');
        const display = document.getElementById('fontSizeValue');
        if (slider) slider.value = window.fontsize;
        if (display) display.textContent = window.fontsize;
    }
    if (typeof window.w !== 'undefined') {
        const slider = document.getElementById('widthSlider');
        const display = document.getElementById('widthValue');
        if (slider) slider.value = window.w;
        if (display) display.textContent = window.w;
    }
    if (typeof window.linespacing !== 'undefined') {
        const slider = document.getElementById('lineSpacingSlider');
        const display = document.getElementById('lineSpacingValue');
        if (slider) slider.value = window.linespacing;
        if (display) display.textContent = window.linespacing;
    }
    
    console.log('Formatting controls initialized with values:', {
        xaxis: window.xaxis,
        yaxis: window.yaxis,
        fontsize: window.fontsize,
        width: window.w,
        linespacing: window.linespacing
    });
}


let myData = `What is Reinforcement Learning?
Reinforcement learning (RL) is an area of machine learning concerned with how software agents ought to take actions in an environment in order to maximize the notion of cumulative reward. Reinforcement learning is one of three basic machine learning paradigms, alongside supervised learning and unsupervised learning.`;
let img, 
myFont = [];
let myFonts = 10; //total number of files on font folder
let imgNum = 1;
let fontNum = 0;
let pageNum = 1;
// Default formatting settings optimized for page layout
// These need to be on window object for global access
window.xaxis = 50;          // Left margin
window.yaxis = 80;          // Top margin  
window.fontsize = 18;       // Readable font size
window.w = 500;             // Text width (leaving right margin)
window.linespacing = 25;    // Line spacing for readability
window.bottomMargin = 50;   // Bottom margin

// Local aliases for easier access in p5.js functions
let xaxis = window.xaxis;
let yaxis = window.yaxis;
let fontsize = window.fontsize;
let w = window.w;
let linespacing = window.linespacing;
let bottomMargin = window.bottomMargin;
function preload() {
    fontLoad();
    loadPage();
}

function setup(){
    let canvas = createCanvas(600,800);
    canvas.parent('contributing');
    rectMode(CORNER);
}

function draw(){
    image(img, 0, 0, width, height);
    
    // Always use the current global values (updated by sliders)
    let currentXaxis = window.xaxis || 50;
    let currentYaxis = window.yaxis || 80;
    let currentFontsize = window.fontsize || 18;
    let currentW = window.w || 500;
    let currentLinespacing = window.linespacing || 25;
    
    // Get current page text if page manager is available
    let currentText = myData;
    if (typeof pageManager !== 'undefined' && pageManager) {
        const currentPage = pageManager.getCurrentPage();
        if (currentPage && currentPage.text) {
            currentText = currentPage.text;
        }
    }
    
    // Apply text settings
    textFont(myFont[fontNum]);
    textSize(currentFontsize);
    fill('#264180');
    textLeading(currentLinespacing);
    
    let data = "\n" + currentText;
    text(data, currentXaxis, currentYaxis, currentW, 900);
}

function fontLoad(){
    for(let i = 0; i < myFonts; i++){
        myFont.push(loadFont('fonts/font ('+str(i)+').ttf'));
    }
}

function changeFont(){
    fontNum += 1;
    fontNum %= myFonts
}

function loadPage(){
    img = loadImage('pages/page (2).jpg');
}

function runOnLoad(){
    const fileupload = document.getElementById("pageUploader");
    const button = document.getElementById("btnPageUpload");
    button.onclick = function () {
        fileupload.click();
    };
    fileupload.onchange = function () {
        console.log("page Uploader Triggered.")
        const reader = new FileReader();
        reader.readAsDataURL(fileupload.files[0]);
        reader.onload = function (e) {
            img = loadImage(e.target.result);
            // Update current page background if page manager exists
            if (typeof pageManager !== 'undefined' && pageManager) {
                const currentPage = pageManager.getCurrentPage();
                if (currentPage) {
                    currentPage.backgroundImage = img;
                }
            }
        }
    };

    const fontupload = document.getElementById("fontUploader");
    const fontButton = document.getElementById("btnFontUpload");
    fontButton.onclick = function () {
        fontupload.click();
    };
    fontupload.onchange = function () {
        console.log("font Uploader Triggered.")
        const reader = new FileReader();
        reader.readAsDataURL(fontupload.files[0]);
        reader.onload = function (e) {
            myFont.push(loadFont(e.target.result))
            myFonts += 1
            fontNum = myFonts - 1
        }
    };

}

// Enhanced updateTextContent function with page manager integration
function updateTextContent(text) {
    myData = text;
    
    // Update page manager if available
    if (typeof pageManager !== 'undefined' && pageManager) {
        const currentPage = pageManager.getCurrentPage();
        if (currentPage) {
            currentPage.text = text;
        }
    }
}

// Calculate text height for given text and formatting
function calculateTextHeight(text, fontSize, lineSpacing, textWidth) {
    if (!text || text.trim().length === 0) return 0;
    
    // Create a temporary p5.js graphics object for measurement
    let pg = createGraphics(1, 1);
    pg.textFont(myFont[fontNum] || 'Arial');
    pg.textSize(fontSize);
    pg.textLeading(lineSpacing);
    
    // Split text into lines based on text width
    let words = text.split(' ');
    let lines = [];
    let currentLine = '';
    
    for (let word of words) {
        let testLine = currentLine + (currentLine ? ' ' : '') + word;
        let lineWidth = pg.textWidth(testLine);
        
        if (lineWidth > textWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    pg.remove(); // Clean up graphics object
    
    // Calculate total height
    return lines.length * lineSpacing;
}

// Check if text fits on current page and auto-create pages if needed
function checkAndCreatePagesForText(text) {
    if (!text || typeof pageManager === 'undefined' || !pageManager) return;
    
    const canvasHeight = 800; // Current canvas height
    const availableHeight = canvasHeight - yaxis - bottomMargin;
    
    // Calculate text height with current formatting
    const textHeight = calculateTextHeight(text, fontsize, linespacing, w);
    
    console.log(`Text height: ${textHeight}px, Available space: ${availableHeight}px`);
    
    if (textHeight > availableHeight) {
        // Text is too long for current page, need to split
        console.log('Text exceeds page height, splitting into multiple pages...');
        autoSplitTextAcrossPages(text, availableHeight);
    }
}

// Automatically split text across pages based on actual height calculations
function autoSplitTextAcrossPages(fullText, availableHeight) {
    if (typeof pageManager === 'undefined' || !pageManager) return;
    
    const words = fullText.split(' ');
    let currentPageText = '';
    let pageNumber = 1;
    
    // Reset to single page first
    pageManager.resetToSinglePage();
    
    for (let i = 0; i < words.length; i++) {
        const testText = currentPageText + (currentPageText ? ' ' : '') + words[i];
        const testHeight = calculateTextHeight(testText, fontsize, linespacing, w);
        
        if (testHeight > availableHeight && currentPageText) {
            // Current page is full, save it and create new page
            console.log(`Page ${pageNumber} complete with ${currentPageText.split(' ').length} words`);
            
            if (pageNumber === 1) {
                // Update first page
                pageManager.pages[0].text = currentPageText.trim();
            } else {
                // Add new page
                pageManager.addPage();
                pageManager.pages[pageManager.pages.length - 1].text = currentPageText.trim();
            }
            
            // Start new page with current word
            currentPageText = words[i];
            pageNumber++;
        } else {
            currentPageText = testText;
        }
    }
    
    // Handle remaining text
    if (currentPageText.trim()) {
        if (pageNumber === 1) {
            pageManager.pages[0].text = currentPageText.trim();
        } else {
            if (pageManager.pages.length < pageNumber) {
                pageManager.addPage();
            }
            pageManager.pages[pageManager.pages.length - 1].text = currentPageText.trim();
        }
    }
    
    // Update UI
    pageManager.currentPageIndex = 0;
    pageManager.loadCurrentPage();
    pageManager.updatePageIndicator();
    pageManager.updateNavigationButtons();
    
    console.log(`Text automatically split across ${pageManager.pages.length} pages`);
}
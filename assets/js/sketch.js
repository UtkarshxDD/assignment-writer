myData = `What is Reinforcement Learning?
Reinforcement learning (RL) is an area of machine learning concerned with how software agents ought to take actions in an environment in order to maximize the notion of cumulative reward. Reinforcement learning is one of three basic machine learning paradigms, alongside supervised learning and unsupervised learning.`
let img, 
myFont = [];
myFonts = 10 //total number of files on font folder
imgNum = 1
fontNum = 0
pageNum = 1
xaxis=20
yaxis=20
fontsize=30
w=700
linespacing=30
function preload() {
    fontLoad();
    loadPage();
}

function setup(){
    canvas = createCanvas(750,1000)
    canvas.parent('contributing')
    rectMode(CORNER);
}

function draw(){
    image(img, 0, 0, width, height)
    textFont(myFont[fontNum]);
    textSize(fontsize)
    fill('#264180')
    if(linespacing){
        textLeading(linespacing);
    }
    
    // Get current page text if page manager is available
    let currentText = myData;
    if (typeof pageManager !== 'undefined' && pageManager) {
        const currentPage = pageManager.getCurrentPage();
        if (currentPage && currentPage.text) {
            currentText = currentPage.text;
            // Update canvas settings from current page
            xaxis = currentPage.xaxis;
            yaxis = currentPage.yaxis;
            fontsize = currentPage.fontsize;
            w = currentPage.width;
            linespacing = currentPage.linespacing;
            textSize(fontsize);
            textLeading(linespacing);
        }
    }
    
    data = "\n" + currentText;
    text(data, xaxis, yaxis, w, 900);
}

function fontLoad(){
    for(var i = 0; i < myFonts; i++){
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
    var fileupload = document.getElementById("pageUploader");
    var button = document.getElementById("btnPageUpload");
    button.onclick = function () {
        fileupload.click();
    };
    fileupload.onchange = function () {
        console.log("page Uploader Triggered.")
        var reader = new FileReader();
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

    var fontupload = document.getElementById("fontUploader");
    button = document.getElementById("btnFontUpload");
    button.onclick = function () {
        fontupload.click();
    };
    fontupload.onchange = function () {
        console.log("font Uploader Triggered.")
        var reader = new FileReader();
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
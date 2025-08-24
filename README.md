Use here : https://utkarshxdd.github.io/assignment-writer/

# Assignment Express

## Overview
**Assignment Express** is an intelligent web application that combines AI-powered content generation with handwritten-style text rendering. Create authentic-looking handwritten assignments with the help of Google's Gemini AI, complete with multi-page support and professional formatting.

## ✨ New AI Features
- **🤖 AI Assignment Generation**: Automatically generate assignments using Google's Gemini API
- **📚 Multiple Assignment Types**: Essay, Report, Summary, Analysis, Research Paper
- **📄 Multi-Page Support**: Automatic page splitting for long assignments
- **🎯 Smart Formatting**: Proper academic structure with introduction, body, and conclusion
- **📱 Interactive Navigation**: Slide through multiple pages with intuitive controls

## Core Features
- **Dynamic Text Rendering**: Create handwritten-style text using a variety of fonts
- **Image Uploads**: Upload custom background images for your text
- **Font Management**: Upload and switch between different font files
- **User-Friendly Interface**: Intuitive controls for adjusting text properties such as size, spacing, and position
- **Dark Mode**: Option to toggle between light and dark themes, with user preferences saved in local storage
- **Progressive Web App**: Offline functionality with service worker caching

## Technologies Used
- **JavaScript**: For application logic and interaction
- **Google Gemini AI**: For intelligent assignment generation
- **p5.js**: A JavaScript library for creating graphic and interactive experiences
- **HTML/CSS**: For structuring and styling the web application
- **Service Workers**: For offline functionality and caching

## Quick Start

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key for Gemini
3. Copy your API key

### 2. Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assignment-express.git
   cd assignment-express
   ```
2. Open `index.html` in your web browser

### 3. Generate Your First Assignment
1. **Enter API Key**: Paste your Gemini API key in the AI section
2. **Choose Topic**: Enter your assignment topic (e.g., "Climate Change")
3. **Select Type**: Choose assignment type (Essay, Report, etc.)
4. **Set Length**: Pick word count (250-1500 words)
5. **Generate**: Click "Generate Assignment" and wait for AI magic! ✨
6. **Navigate**: Use page controls to browse through multiple pages
7. **Customize**: Adjust formatting using the sliders
8. **Download**: Save individual pages or download all at once

## Manual Usage (Original Features)
1. Open the `index.html` file in your web browser to run the application
2. Use the "Upload Page" button to select a background image
3. Use the "Upload Font" button to select a font file  
4. Enter your desired text in the provided text area
5. Adjust the text properties using the sliders for X/Y axes, font size, and line spacing
6. The application renders your text over the uploaded background image
7. Toggle dark mode for a better viewing experience

## Code Explanation

### Key Functions
- **`randint(i, j)`**: Returns a random integer between `i` and `j`.
- **`range(start, stop, step)`**: Generates an array of numbers within a specified range and step.

### Array Extensions:
- **`equals(array)`**: Compares two arrays for equality.
- **`delete(elem)`**: Removes the first occurrence of an element from an array.
- **`count(elem)`**: Returns the count of a specific element in the array.

### Dark Mode Handling
- **`loadDarkModeFromLocalStorage()`**: Loads the user's dark mode preference from local storage.
- **`darkLightToggle()`**: Toggles dark mode on or off and updates the stylesheet accordingly.
- **`saveLocalStorageDarkMode()`**: Saves the current dark mode preference to local storage.

### Canvas Setup
- **`preload()`**: Preloads font files and background images before the application runs.
- **`setup()`**: Initializes the canvas where text will be rendered.
- **`draw()`**: Continuously renders the background image and overlays the text with specified properties.

### File Upload Handling
- **`runOnLoad()`**: Sets up file upload handlers for both background images and fonts.

Use here : https://utkarshxdd.github.io/assignment-writer/

# Assignment Express

## Overview
**Assignment Express** is a web application designed to create visually appealing handwritten-style text on custom backgrounds. Users can upload images and fonts, providing a flexible and personalized experience for generating text graphics for assignments, notes, and more.

## Features
- **Dynamic Text Rendering**: Create handwritten-style text using a variety of fonts.
- **Image Uploads**: Upload custom background images for your text.
- **Font Management**: Upload and switch between different font files.
- **User-Friendly Interface**: Intuitive controls for adjusting text properties such as size, spacing, and position.
- **Dark Mode**: Option to toggle between light and dark themes, with user preferences saved in local storage.

## Technologies Used
- **JavaScript**: For application logic and interaction.
- **p5.js**: A JavaScript library for creating graphic and interactive experiences.
- **HTML/CSS**: For structuring and styling the web application.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assignment-express.git
   cd assignment-express
## Usage
1. Open the `index.html` file in your web browser to run the application.
2. Use the "Upload Page" button to select a background image.
3. Use the "Upload Font" button to select a font file.
4. Enter your desired text in the provided text area.
5. Adjust the text properties using the sliders for X/Y axes, font size, and line spacing.
6. The application renders your text over the uploaded background image.
7. Toggle dark mode for a better viewing experience.

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

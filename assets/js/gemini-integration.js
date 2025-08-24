// Gemini AI Integration for Assignment Generation
class GeminiAssignmentGenerator {
    constructor() {
        this.apiKey = '';
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        this.loadApiKey();
    }

    // Load API key from localStorage
    loadApiKey() {
        if (localStorage.hasOwnProperty("geminiApiKey")) {
            this.apiKey = localStorage.geminiApiKey;
            const apiKeyInput = document.getElementById('apiKey');
            if (apiKeyInput) {
                apiKeyInput.value = this.apiKey;
            }
        }
    }

    // Save API key to localStorage
    saveApiKey(key) {
        this.apiKey = key;
        localStorage.geminiApiKey = key;
    }

    // Generate assignment prompt based on user inputs
    generatePrompt(topic, type, wordCount) {
        const prompts = {
            essay: `Write a comprehensive ${wordCount}-word essay about "${topic}". Include an introduction, body paragraphs with detailed explanations, and a conclusion. Use proper academic structure and formatting.`,
            report: `Create a detailed ${wordCount}-word report on "${topic}". Include sections like introduction, methodology (if applicable), findings, analysis, and conclusion. Use formal report structure.`,
            summary: `Write a ${wordCount}-word summary about "${topic}". Provide key points, main concepts, and important details in a clear and concise manner.`,
            analysis: `Provide a ${wordCount}-word analysis of "${topic}". Include critical examination, interpretation, evaluation of different aspects, and supported arguments.`,
            research: `Write a ${wordCount}-word research paper on "${topic}". Include introduction, literature review, methodology, findings, discussion, and conclusion. Use academic tone and structure.`
        };

        return prompts[type] || prompts.essay;
    }

    // Make API call to Gemini
    async generateContent(prompt) {
        if (!this.apiKey) {
            throw new Error('Please enter your Gemini API key');
        }

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 2048,
            }
        };

        try {
            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error?.message || `API Error: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('No content generated. Please try again.');
            }
        } catch (error) {
            console.error('Gemini API Error:', error);
            throw error;
        }
    }

    // Show loading state
    showLoading(show = true) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const generateBtn = document.getElementById('generateBtn');
        
        if (show) {
            loadingIndicator.classList.remove('hidden');
            generateBtn.disabled = true;
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        } else {
            loadingIndicator.classList.add('hidden');
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-magic"></i> Generate Assignment';
        }
    }

    // Show error message
    showError(message) {
        // Create or update error display
        let errorDiv = document.getElementById('aiErrorMessage');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = 'aiErrorMessage';
            errorDiv.className = 'error-message';
            document.querySelector('.ai-section').appendChild(errorDiv);
        }
        
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        errorDiv.style.display = 'block';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    // Clear error message
    clearError() {
        const errorDiv = document.getElementById('aiErrorMessage');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    }
}

// Initialize Gemini generator
const geminiGenerator = new GeminiAssignmentGenerator();

// Main function to generate assignment
async function generateAssignment() {
    try {
        // Clear any previous errors
        geminiGenerator.clearError();
        
        // Get user inputs
        const topic = document.getElementById('topicField').value.trim();
        const type = document.getElementById('assignmentType').value;
        const wordCount = document.getElementById('wordCount').value;
        const apiKey = document.getElementById('apiKey').value.trim();

        // Validation
        if (!topic) {
            geminiGenerator.showError('Please enter an assignment topic');
            return;
        }

        if (!apiKey) {
            geminiGenerator.showError('Please enter your Gemini API key');
            return;
        }

        // Save API key
        geminiGenerator.saveApiKey(apiKey);

        // Show loading state
        geminiGenerator.showLoading(true);

        // Generate prompt
        const prompt = geminiGenerator.generatePrompt(topic, type, wordCount);

        // Call Gemini API
        const generatedText = await geminiGenerator.generateContent(prompt);

        // Process the generated text
        await processGeneratedAssignment(generatedText);

        // Show success message
        showSuccessMessage('Assignment generated successfully!');

    } catch (error) {
        console.error('Generation error:', error);
        geminiGenerator.showError(error.message || 'Failed to generate assignment. Please try again.');
    } finally {
        geminiGenerator.showLoading(false);
    }
}

// Process generated assignment and handle multi-page layout
async function processGeneratedAssignment(text) {
    // Clear existing pages except the first one
    resetToSinglePage();
    
    // Update the main text content
    updateTextContent(text);
    
    // Check if text needs multiple pages
    const needsMultiplePages = await checkIfTextNeedsMultiplePages(text);
    
    if (needsMultiplePages) {
        await distributeTextAcrossPages(text);
    }
    
    // Update page indicator
    updatePageIndicator();
}

// Show success message
function showSuccessMessage(message) {
    // Create or update success display
    let successDiv = document.getElementById('aiSuccessMessage');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'aiSuccessMessage';
        successDiv.className = 'success-message';
        document.querySelector('.ai-section').appendChild(successDiv);
    }
    
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successDiv.style.display = 'block';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 3000);
}

// Update text content in the textarea and global variable
function updateTextContent(text) {
    const dataField = document.getElementById('dataField');
    if (dataField) {
        dataField.value = text;
    }
    
    // Update global variable for p5.js
    if (typeof window.myData !== 'undefined') {
        window.myData = text;
    }
    
    // Update current page text if using multi-page system
    if (typeof pages !== 'undefined' && pages.length > 0) {
        pages[currentPageIndex].text = text;
    }
}

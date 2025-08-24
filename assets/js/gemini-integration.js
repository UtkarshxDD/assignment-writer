// Gemini AI Integration for Assignment Generation
class GeminiAssignmentGenerator {
    constructor() {
        this.apiKey = '';
        this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
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
        const baseInstructions = `
Target length: Approximately ${wordCount} words (±10% is acceptable)

Writing Guidelines:
- Focus on detailed explanations and comprehensive coverage
- Include specific examples, case studies, and real-world applications
- Provide thorough analysis and multiple perspectives
- Use academic depth with scholarly insights
- Write substantial paragraphs with detailed supporting information
- Include background context and relevant details
- Expand on key concepts with elaborate explanations
- Use transitional phrases to connect ideas smoothly

Please write comprehensive, detailed content with rich examples and thorough analysis.`;

        const prompts = {
            essay: `TASK: Write a ${wordCount}-word academic essay about "${topic}".

${baseInstructions}

CRITICAL INSTRUCTIONS FOR ESSAY WRITING:
- You MUST write EXACTLY ${wordCount} words
- Every sentence must be detailed and comprehensive
- Include extensive examples, explanations, and analysis
- Write long, elaborate paragraphs with multiple supporting points
- Add background information, context, and detailed descriptions
- Include specific examples, case studies, and real-world applications
- Use transitional phrases and connecting sentences between ideas
- Expand on every concept with thorough explanations

ESSAY STRUCTURE (TOTAL: ${wordCount} words):

1. INTRODUCTION (${Math.round(wordCount * 0.15)} words):
   - Hook: Start with a compelling opening statement, question, or statistic
   - Background: Provide essential context about ${topic}
   - Thesis statement: Clear argument or main point about ${topic}
   - Preview of main points that will be discussed

2. BODY PARAGRAPHS (${Math.round(wordCount * 0.7)} words total - approximately 3-5 paragraphs):
   Each paragraph should contain:
   - Topic sentence introducing the main point
   - Detailed explanation with specific examples
   - Evidence, statistics, or expert opinions
   - Analysis of how this relates to ${topic}
   - Transition to the next point
   
   Cover multiple aspects of ${topic} such as:
   - Historical background and development
   - Current state and recent developments
   - Different perspectives or viewpoints
   - Causes and effects
   - Implications and significance
   - Real-world applications or examples

3. CONCLUSION (${Math.round(wordCount * 0.15)} words):
   - Restate thesis in new words
   - Summarize key points discussed
   - Broader implications for society/field
   - Call to action or future considerations

WRITING REQUIREMENTS:
- Use formal academic language
- Include specific examples and case studies
- Reference real events, people, or studies when possible
- Elaborate on every point with detailed explanations
- Use sophisticated vocabulary and varied sentence structure
- Ensure smooth transitions between ideas
- Write ${wordCount} words exactly - no more, no less

Write the complete essay now:

Write a comprehensive, well-structured essay with detailed analysis and examples.`,

            report: `You are creating a professional report on "${topic}". ${baseInstructions}

REPORT STRUCTURE (Total: ${wordCount} words):

1. EXECUTIVE SUMMARY (${Math.round(wordCount * 0.08)} words):
   - Brief overview of ${topic}
   - Key findings and recommendations
   - Summary of main conclusions

2. INTRODUCTION (${Math.round(wordCount * 0.12)} words):
   - Purpose and scope of the report
   - Background information on ${topic}
   - Methodology or approach used

3. BACKGROUND/CONTEXT (${Math.round(wordCount * 0.2)} words):
   - Historical development of ${topic}
   - Current situation and trends
   - Key stakeholders and their roles
   - Relevant regulations or standards

4. DETAILED ANALYSIS/FINDINGS (${Math.round(wordCount * 0.4)} words):
   - Comprehensive examination of ${topic}
   - Data analysis and interpretation
   - Multiple perspectives and viewpoints
   - Challenges and opportunities
   - Case studies and examples
   - Statistical information and trends

5. DISCUSSION (${Math.round(wordCount * 0.12)} words):
   - Implications of findings
   - Comparison with industry standards
   - Risk assessment and mitigation

6. CONCLUSIONS AND RECOMMENDATIONS (${Math.round(wordCount * 0.08)} words):
   - Summary of key findings
   - Actionable recommendations
   - Future outlook

Write a comprehensive, professional report with detailed analysis and supporting information.`,

            summary: `Create a comprehensive summary of "${topic}". ${baseInstructions}

SUMMARY STRUCTURE (Total: ${wordCount} words):

1. OVERVIEW (${Math.round(wordCount * 0.2)} words):
   - What is ${topic}?
   - Why is it important?
   - Main components or aspects

2. KEY CONCEPTS AND IDEAS (${Math.round(wordCount * 0.4)} words):
   - Fundamental principles of ${topic}
   - Major theories or frameworks
   - Important terminology and definitions
   - Historical development and evolution

3. DETAILED SUPPORTING INFORMATION (${Math.round(wordCount * 0.3)} words):
   - Specific examples and case studies
   - Statistical data and research findings
   - Expert opinions and perspectives
   - Real-world applications

4. SIGNIFICANCE AND IMPLICATIONS (${Math.round(wordCount * 0.1)} words):
   - Impact on society/industry/field
   - Future trends and developments
   - Broader implications

Write a comprehensive, detailed summary with thorough explanations and examples.`,

            analysis: `Conduct a thorough analysis of "${topic}". ${baseInstructions}

ANALYSIS STRUCTURE (Total: ${wordCount} words):

1. INTRODUCTION (${Math.round(wordCount * 0.15)} words):
   - Define and introduce ${topic}
   - Establish analytical framework
   - Outline key questions to examine

2. MULTIPLE ANALYTICAL PERSPECTIVES (${Math.round(wordCount * 0.5)} words):
   Examine ${topic} from various angles:
   - Historical perspective: How has ${topic} evolved?
   - Social/Cultural perspective: What are the societal impacts?
   - Economic perspective: What are the financial implications?
   - Technical/Scientific perspective: What are the mechanisms?
   - Political perspective: What are the policy implications?
   - Environmental perspective: What are the ecological effects?

3. CRITICAL EXAMINATION (${Math.round(wordCount * 0.25)} words):
   - Strengths and weaknesses of ${topic}
   - Controversies and debates
   - Evidence supporting different viewpoints
   - Gaps in current understanding

4. SYNTHESIS AND CONCLUSIONS (${Math.round(wordCount * 0.1)} words):
   - Integration of different perspectives
   - Overall assessment of ${topic}
   - Future research directions

Write a comprehensive, analytical examination with deep insights and extensive evidence.`,

            research: `Write a scholarly research paper on "${topic}". ${baseInstructions}

RESEARCH PAPER STRUCTURE (Total: ${wordCount} words):

1. ABSTRACT (${Math.round(wordCount * 0.05)} words):
   - Concise summary of research
   - Key findings and implications

2. INTRODUCTION & LITERATURE REVIEW (${Math.round(wordCount * 0.25)} words):
   - Background and significance of ${topic}
   - Review of existing research
   - Identification of research gaps
   - Research questions and objectives

3. METHODOLOGY (${Math.round(wordCount * 0.15)} words):
   - Research approach and design
   - Data collection methods
   - Analysis techniques
   - Limitations and considerations

4. FINDINGS AND ANALYSIS (${Math.round(wordCount * 0.35)} words):
   - Detailed presentation of results
   - Data interpretation and analysis
   - Relationship to existing literature
   - Unexpected findings and insights

5. DISCUSSION (${Math.round(wordCount * 0.12)} words):
   - Implications of findings
   - Theoretical contributions
   - Practical applications
   - Limitations and future research

6. CONCLUSION (${Math.round(wordCount * 0.08)} words):
   - Summary of key contributions
   - Final thoughts and recommendations

Write a comprehensive, scholarly research paper with extensive analysis and academic depth.`
        };

        return prompts[type] || prompts.essay;
    }

    // Generate assignment in sections for better control
    async generateAssignmentInSections(topic, type, wordCount) {
        const sections = this.getSectionBreakdown(type, wordCount);
        let fullText = "";
        let totalWordsGenerated = 0;

        for (const section of sections) {
            const sectionPrompt = this.generateSectionPrompt(topic, type, section, wordCount);
            
            try {
                const sectionText = await this.generateContent(sectionPrompt);
                const sectionWords = sectionText.trim().split(/\s+/).length;
                
                fullText += sectionText + "\n\n";
                totalWordsGenerated += sectionWords;
                
                console.log(`Generated ${section.name}: ${sectionWords} words (target: ~${section.words})`);
                
                // Small delay between sections to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 500));
                
            } catch (error) {
                console.error(`Error generating ${section.name}:`, error);
                throw error;
            }
        }

        console.log(`Total generated: ${totalWordsGenerated} words (target: ${wordCount})`);
        
        // If total is too short, expand the main body section
        if (totalWordsGenerated < wordCount * 0.8) {
            fullText = await this.expandContent(fullText, topic, type, wordCount - totalWordsGenerated);
        }
        
        return fullText.trim();
    }

    // Get section breakdown based on assignment type
    getSectionBreakdown(type, wordCount) {
        const breakdowns = {
            essay: [
                { name: "Introduction", words: Math.round(wordCount * 0.15), description: "engaging introduction with thesis" },
                { name: "Body Part 1", words: Math.round(wordCount * 0.25), description: "main arguments and analysis" },
                { name: "Body Part 2", words: Math.round(wordCount * 0.25), description: "supporting evidence and examples" },
                { name: "Body Part 3", words: Math.round(wordCount * 0.2), description: "additional perspectives and analysis" },
                { name: "Conclusion", words: Math.round(wordCount * 0.15), description: "summary and final thoughts" }
            ],
            report: [
                { name: "Executive Summary", words: Math.round(wordCount * 0.1), description: "brief overview and key findings" },
                { name: "Introduction", words: Math.round(wordCount * 0.15), description: "background and purpose" },
                { name: "Analysis Section 1", words: Math.round(wordCount * 0.25), description: "detailed analysis and findings" },
                { name: "Analysis Section 2", words: Math.round(wordCount * 0.25), description: "additional analysis and data" },
                { name: "Discussion", words: Math.round(wordCount * 0.15), description: "implications and interpretation" },
                { name: "Conclusion", words: Math.round(wordCount * 0.1), description: "summary and recommendations" }
            ],
            analysis: [
                { name: "Introduction", words: Math.round(wordCount * 0.15), description: "introduction to the analysis" },
                { name: "Background Analysis", words: Math.round(wordCount * 0.2), description: "contextual background" },
                { name: "Main Analysis", words: Math.round(wordCount * 0.35), description: "detailed analytical examination" },
                { name: "Critical Evaluation", words: Math.round(wordCount * 0.2), description: "critical assessment and evaluation" },
                { name: "Conclusion", words: Math.round(wordCount * 0.1), description: "synthesis and final thoughts" }
            ]
        };

        // Default to essay structure if type not found
        return breakdowns[type] || breakdowns.essay;
    }

    // Generate prompt for a specific section
    generateSectionPrompt(topic, type, section, totalWordCount) {
        return `Write the ${section.name} section of a ${type} about "${topic}".

This section should be approximately ${section.words} words and focus on: ${section.description}.

Requirements:
- Write detailed, comprehensive content with specific examples
- Include relevant analysis and supporting information
- Use academic language appropriate for a ${totalWordCount}-word ${type}
- Provide substantial detail without summarizing too briefly
- Include specific facts, examples, or case studies where relevant

Write only this section (${section.name}) with approximately ${section.words} words:`;
    }

    // Expand content if it's too short
    async expandContent(existingText, topic, type, additionalWords) {
        const expansionPrompt = `The following ${type} about "${topic}" needs to be expanded by approximately ${additionalWords} more words.

Current text:
${existingText}

Please add ${additionalWords} more words by:
- Expanding existing paragraphs with more detailed explanations
- Adding specific examples and case studies
- Including additional analysis and supporting information
- Providing more background context where appropriate

Add the additional content naturally throughout the text:`;

        try {
            const expansion = await this.generateContent(expansionPrompt);
            return expansion;
        } catch (error) {
            console.error('Error expanding content:', error);
            return existingText;
        }
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
                temperature: 0.9,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 32768, // Allow much longer content
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
            
            if (data.candidates?.[0]?.content) {
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
            errorDiv.className = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mt-4';
            const aiSection = document.querySelector('.bg-gradient-to-br');
            if (aiSection) {
                aiSection.appendChild(errorDiv);
            }
        }
        
        errorDiv.innerHTML = `<div class="flex items-center"><i class="fas fa-exclamation-circle mr-2"></i> ${message}</div>`;
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

        // Show section generation progress
        geminiGenerator.showLoading(true);
        const loadingDiv = document.getElementById('loadingIndicator');
        if (loadingDiv) {
            loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Generating assignment sections...';
        }

        // Use chunked generation for better results
        const generatedText = await geminiGenerator.generateAssignmentInSections(topic, type, wordCount);
        
        // Log final word count
        const finalWordCount = generatedText.trim().split(/\s+/).length;
        console.log(`Final generated content: ${finalWordCount} words (target: ${wordCount})`);

        // Process the generated text with typewriter effect
        await processGeneratedAssignmentWithTypewriter(generatedText);

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

// Process generated assignment with typewriter effect
async function processGeneratedAssignmentWithTypewriter(generatedText) {
    // Show typewriter progress indicator
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
        loadingDiv.innerHTML = '<i class="fas fa-keyboard mr-1"></i> Writing on paper...';
    }
    
    // Clear existing pages except the first one
    resetToSinglePage();
    
    // Clear current text
    updateTextContent('');
    
    // If using page manager, ensure we start from first page
    if (typeof pageManager !== 'undefined' && pageManager) {
        pageManager.currentPageIndex = 0;
        pageManager.updatePageIndicator();
    }
    
    // Split text into words for typewriter effect
    const words = generatedText.trim().split(/\s+/);
    let currentText = '';
    let currentPageText = '';
    let currentPageIndex = 0;
    
    // Typewriter parameters
    const wordsPerStep = 3; // How many words to add per step
    const stepDelay = 80; // Milliseconds between steps
    
    // Calculate actual page capacity based on canvas height and formatting
    const canvasHeight = 800;
    const availableHeight = canvasHeight - 80 - 50; // yaxis - bottomMargin
    const avgLineHeight = 25; // linespacing
    const maxLines = Math.floor(availableHeight / avgLineHeight);
    const avgWordsPerLine = 8; // Approximate words per line with font size 18
    const pageCapacity = Math.floor(maxLines * avgWordsPerLine * 0.9); // 90% to be safe
    
    // Process words in chunks
    for (let i = 0; i < words.length; i += wordsPerStep) {
        const wordsChunk = words.slice(i, i + wordsPerStep);
        const chunkText = wordsChunk.join(' ') + ' ';
        
        currentText += chunkText;
        currentPageText += chunkText;
        
        // Check if current page is getting full
        const currentPageWords = currentPageText.trim().split(/\s+/).length;
        
        if (currentPageWords >= pageCapacity && i < words.length - wordsPerStep) {
            // Page is full, switch to next page
            if (typeof pageManager !== 'undefined' && pageManager) {
                // Update current page with text
                const currentPage = pageManager.getCurrentPage();
                if (currentPage) {
                    currentPage.text = currentPageText.trim();
                }
                
                // Create new page
                pageManager.addPage();
                currentPageIndex++;
                pageManager.currentPageIndex = currentPageIndex;
                pageManager.updatePageIndicator();
                
                // Reset page text counter
                currentPageText = '';
                
                // Update progress indicator
                if (loadingDiv) {
                    loadingDiv.innerHTML = `<i class="fas fa-keyboard mr-1"></i> Writing on paper... Page ${currentPageIndex + 1}`;
                }
            }
        }
        
        // Update the current page display
        if (typeof pageManager !== 'undefined' && pageManager) {
            const currentPage = pageManager.getCurrentPage();
            if (currentPage) {
                currentPage.text = currentPageText.trim();
            }
            // Update global myData for p5.js
            if (typeof window.myData !== 'undefined') {
                window.myData = currentPageText.trim();
            }
        } else {
            updateManualText(currentText.trim());
        }
        
        // Update text area to show current page text
        const dataField = document.getElementById('dataField');
        if (dataField) {
            dataField.value = currentPageText.trim();
        }
        
        // Wait before next step for typewriter effect
        await new Promise(resolve => setTimeout(resolve, stepDelay));
    }
    
    // Ensure final text is properly set
    if (typeof pageManager !== 'undefined' && pageManager) {
        const currentPage = pageManager.getCurrentPage();
        if (currentPage) {
            currentPage.text = currentPageText.trim();
        }
        // Update page indicator one final time
        pageManager.updatePageIndicator();
    } else {
        updateManualText(currentText.trim());
    }
    
    // Update text area with final text of current page
    const dataField = document.getElementById('dataField');
    if (dataField) {
        dataField.value = currentPageText.trim();
    }
    
    console.log(`Typewriter effect completed. Total pages: ${currentPageIndex + 1}, Total words: ${words.length}`);
}

// Show success message
function showSuccessMessage(message) {
    // Create or update success display
    let successDiv = document.getElementById('aiSuccessMessage');
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.id = 'aiSuccessMessage';
        successDiv.className = 'bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mt-4';
        const aiSection = document.querySelector('.bg-gradient-to-br');
        if (aiSection) {
            aiSection.appendChild(successDiv);
        }
    }
    
    successDiv.innerHTML = `<div class="flex items-center"><i class="fas fa-check-circle mr-2"></i> ${message}</div>`;
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
        
        // Trigger the onkeyup event to update myData
        const event = new Event('keyup');
        dataField.dispatchEvent(event);
    }
    
    // Update global variable for p5.js
    if (typeof window.myData !== 'undefined') {
        window.myData = text;
    }
    
    // Update current page text if using multi-page system
    if (typeof pageManager !== 'undefined' && pageManager) {
        const currentPage = pageManager.getCurrentPage();
        if (currentPage) {
            currentPage.text = text;
        }
    }
}

// Clear form after successful generation
function clearGenerationForm() {
    const topicField = document.getElementById('topicField');
    if (topicField) {
        topicField.value = '';
    }
}

// Auto-save API key functionality
function setupAutoSave() {
    const apiKeyField = document.getElementById('apiKey');
    if (apiKeyField) {
        apiKeyField.addEventListener('blur', function() {
            const key = this.value.trim();
            if (key) {
                geminiGenerator.saveApiKey(key);
            }
        });
    }
}

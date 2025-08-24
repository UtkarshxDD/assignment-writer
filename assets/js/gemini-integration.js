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

    // Analyze topic to determine content type and approach
    analyzeTopic(topic) {
        const topicLower = topic.toLowerCase();
        
        // Academic subjects
        if (topicLower.includes('history') || topicLower.includes('historical') || topicLower.includes('ancient') || topicLower.includes('medieval') || topicLower.includes('world war') || topicLower.includes('civilization')) {
            return { type: 'academic', subject: 'history', approach: 'chronological' };
        }
        if (topicLower.includes('science') || topicLower.includes('scientific') || topicLower.includes('physics') || topicLower.includes('chemistry') || topicLower.includes('biology') || topicLower.includes('genetics') || topicLower.includes('evolution') || topicLower.includes('molecular') || topicLower.includes('quantum') || topicLower.includes('thermodynamics')) {
            return { type: 'academic', subject: 'science', approach: 'analytical' };
        }
        if (topicLower.includes('math') || topicLower.includes('mathematics') || topicLower.includes('algebra') || topicLower.includes('calculus') || topicLower.includes('geometry') || topicLower.includes('statistics') || topicLower.includes('probability') || topicLower.includes('trigonometry')) {
            return { type: 'academic', subject: 'mathematics', approach: 'problem-solving' };
        }
        if (topicLower.includes('literature') || topicLower.includes('book') || topicLower.includes('novel') || topicLower.includes('poem') || topicLower.includes('author') || topicLower.includes('shakespeare') || topicLower.includes('poetry') || topicLower.includes('drama') || topicLower.includes('fiction') || topicLower.includes('non-fiction')) {
            return { type: 'academic', subject: 'literature', approach: 'analytical' };
        }
        if (topicLower.includes('philosophy') || topicLower.includes('philosophical') || topicLower.includes('ethics') || topicLower.includes('logic') || topicLower.includes('metaphysics') || topicLower.includes('epistemology') || topicLower.includes('existentialism') || topicLower.includes('stoicism')) {
            return { type: 'academic', subject: 'philosophy', approach: 'theoretical' };
        }
        if (topicLower.includes('economics') || topicLower.includes('economic') || topicLower.includes('market') || topicLower.includes('supply') || topicLower.includes('demand') || topicLower.includes('inflation') || topicLower.includes('gdp') || topicLower.includes('trade') || topicLower.includes('finance') || topicLower.includes('banking')) {
            return { type: 'academic', subject: 'economics', approach: 'analytical' };
        }
        if (topicLower.includes('psychology') || topicLower.includes('psychological') || topicLower.includes('behavior') || topicLower.includes('cognitive') || topicLower.includes('therapy') || topicLower.includes('mental health') || topicLower.includes('personality') || topicLower.includes('learning') || topicLower.includes('memory') || topicLower.includes('emotion')) {
            return { type: 'academic', subject: 'psychology', approach: 'research-based' };
        }
        if (topicLower.includes('sociology') || topicLower.includes('social') || topicLower.includes('society') || topicLower.includes('culture') || topicLower.includes('community') || topicLower.includes('social change') || topicLower.includes('social structure') || topicLower.includes('socialization')) {
            return { type: 'academic', subject: 'sociology', approach: 'social-analysis' };
        }
        if (topicLower.includes('geography') || topicLower.includes('geographic') || topicLower.includes('climate') || topicLower.includes('environment') || topicLower.includes('ecosystem') || topicLower.includes('biodiversity') || topicLower.includes('natural resources') || topicLower.includes('population')) {
            return { type: 'academic', subject: 'geography', approach: 'spatial-analysis' };
        }
        if (topicLower.includes('political') || topicLower.includes('politics') || topicLower.includes('government') || topicLower.includes('democracy') || topicLower.includes('election') || topicLower.includes('policy') || topicLower.includes('legislation') || topicLower.includes('constitution') || topicLower.includes('international relations')) {
            return { type: 'academic', subject: 'political-science', approach: 'policy-analysis' };
        }
        
        // Current events and contemporary issues
        if (topicLower.includes('climate change') || topicLower.includes('global warming') || topicLower.includes('environmental') || topicLower.includes('sustainability') || topicLower.includes('renewable energy') || topicLower.includes('carbon') || topicLower.includes('pollution')) {
            return { type: 'current-events', subject: 'environmental', approach: 'evidence-based' };
        }
        if (topicLower.includes('technology') || topicLower.includes('ai') || topicLower.includes('artificial intelligence') || topicLower.includes('digital') || topicLower.includes('internet') || topicLower.includes('social media') || topicLower.includes('cybersecurity') || topicLower.includes('blockchain') || topicLower.includes('machine learning') || topicLower.includes('automation')) {
            return { type: 'current-events', subject: 'technology', approach: 'innovative' };
        }
        if (topicLower.includes('health') || topicLower.includes('medical') || topicLower.includes('disease') || topicLower.includes('pandemic') || topicLower.includes('vaccine') || topicLower.includes('healthcare') || topicLower.includes('medicine') || topicLower.includes('public health')) {
            return { type: 'current-events', subject: 'health', approach: 'medical' };
        }
        if (topicLower.includes('education') || topicLower.includes('learning') || topicLower.includes('teaching') || topicLower.includes('school') || topicLower.includes('university') || topicLower.includes('curriculum') || topicLower.includes('pedagogy') || topicLower.includes('student') || topicLower.includes('academic')) {
            return { type: 'current-events', subject: 'education', approach: 'educational' };
        }
        
        // Business and professional topics
        if (topicLower.includes('business') || topicLower.includes('management') || topicLower.includes('marketing') || topicLower.includes('finance') || topicLower.includes('entrepreneurship') || topicLower.includes('startup') || topicLower.includes('corporate') || topicLower.includes('leadership') || topicLower.includes('strategy') || topicLower.includes('innovation')) {
            return { type: 'professional', subject: 'business', approach: 'practical' };
        }
        if (topicLower.includes('law') || topicLower.includes('legal') || topicLower.includes('justice') || topicLower.includes('court') || topicLower.includes('constitution') || topicLower.includes('rights') || topicLower.includes('criminal') || topicLower.includes('civil law')) {
            return { type: 'professional', subject: 'law', approach: 'legal-analysis' };
        }
        if (topicLower.includes('medicine') || topicLower.includes('medical') || topicLower.includes('healthcare') || topicLower.includes('clinical') || topicLower.includes('treatment') || topicLower.includes('diagnosis') || topicLower.includes('patient')) {
            return { type: 'professional', subject: 'medicine', approach: 'clinical' };
        }
        
        // Arts and culture
        if (topicLower.includes('art') || topicLower.includes('painting') || topicLower.includes('sculpture') || topicLower.includes('music') || topicLower.includes('film') || topicLower.includes('cinema') || topicLower.includes('theater') || topicLower.includes('dance') || topicLower.includes('architecture') || topicLower.includes('design')) {
            return { type: 'academic', subject: 'arts', approach: 'creative-analysis' };
        }
        
        // Sports and recreation
        if (topicLower.includes('sport') || topicLower.includes('athletic') || topicLower.includes('fitness') || topicLower.includes('exercise') || topicLower.includes('olympic') || topicLower.includes('team') || topicLower.includes('coaching')) {
            return { type: 'general', subject: 'sports', approach: 'performance-based' };
        }
        
        // Default for other topics
        return { type: 'general', subject: 'general', approach: 'comprehensive' };
    }

    // Generate assignment prompt based on user inputs with improved accuracy
    generatePrompt(topic, wordCount, assignmentType = 'essay', customType = '') {
        const analysis = this.analyzeTopic(topic);
        
        let specificInstructions = '';
        let contentStructure = '';
        
        // Generate specific instructions based on topic analysis and assignment type
        const assignmentInstructions = this.getAssignmentTypeInstructions(assignmentType, topic, customType);
        
        switch (analysis.type) {
            case 'academic':
                specificInstructions = this.getAcademicInstructions(analysis.subject, topic) + '\n\n' + assignmentInstructions;
                contentStructure = this.getAssignmentTypeStructure(wordCount, assignmentType, analysis.subject, customType);
                break;
            case 'current-events':
                specificInstructions = this.getCurrentEventsInstructions(analysis.subject, topic) + '\n\n' + assignmentInstructions;
                contentStructure = this.getAssignmentTypeStructure(wordCount, assignmentType, analysis.subject, customType);
                break;
            case 'professional':
                specificInstructions = this.getProfessionalInstructions(analysis.subject, topic) + '\n\n' + assignmentInstructions;
                contentStructure = this.getAssignmentTypeStructure(wordCount, assignmentType, analysis.subject, customType);
                break;
            default:
                specificInstructions = this.getGeneralInstructions(topic) + '\n\n' + assignmentInstructions;
                contentStructure = this.getAssignmentTypeStructure(wordCount, assignmentType, analysis.subject, customType);
        }

        return `You are an expert academic writer with deep knowledge of ${analysis.subject}. Write a comprehensive, accurate, and well-researched piece about "${topic}".

CRITICAL REQUIREMENTS:
- Write EXACTLY ${wordCount} words (±5%)
- Provide accurate, factual information with specific details
- Include relevant examples, data, and evidence
- Use proper academic tone and structure
- Avoid vague or generic statements
- Ensure all information is current and reliable

${specificInstructions}

CONTENT STRUCTURE (${wordCount} words total):
${contentStructure}

WRITING GUIDELINES:
- Start with a compelling introduction that clearly states the topic
- Use specific examples, statistics, and real-world applications
- Include relevant background information and context
- Provide detailed analysis and explanations
- Use transitional phrases to connect ideas smoothly
- End with a strong conclusion that summarizes key points
- Maintain academic rigor while being engaging and accessible

IMPORTANT: Focus specifically on "${topic}" - do not write about general concepts unless directly related to the topic. Every paragraph should directly address the topic with specific, relevant information.

Write the complete ${wordCount}-word piece now:`;
    }

    // Get academic-specific instructions
    getAcademicInstructions(subject, topic) {
        const instructions = {
            'history': `For this historical topic, include:
- Specific dates, events, and historical figures
- Primary and secondary source references where applicable
- Historical context and significance
- Cause-and-effect relationships
- Impact on subsequent events or modern times`,
            
            'science': `For this scientific topic, include:
- Scientific principles and theories
- Research findings and studies
- Experimental evidence and data
- Real-world applications and implications
- Current scientific understanding`,
            
            'mathematics': `For this mathematical topic, include:
- Mathematical concepts and principles
- Problem-solving approaches and methods
- Real-world applications and examples
- Historical development of the concept
- Practical significance and usage`,
            
            'literature': `For this literary topic, include:
- Textual analysis and interpretation
- Literary devices and techniques used
- Author's background and context
- Critical perspectives and themes
- Cultural and historical significance`,
            
            'philosophy': `For this philosophical topic, include:
- Philosophical arguments and theories
- Key thinkers and their contributions
- Logical reasoning and analysis
- Different perspectives and viewpoints
- Contemporary relevance and implications`,
            
            'economics': `For this economic topic, include:
- Economic principles and theories
- Statistical data and trends
- Market analysis and factors
- Policy implications and effects
- Real-world economic examples`,
            
            'psychology': `For this psychological topic, include:
- Psychological theories and research
- Experimental studies and findings
- Behavioral and cognitive aspects
- Clinical or practical applications
- Current psychological understanding`,
            
            'sociology': `For this sociological topic, include:
- Social theories and perspectives
- Research studies and data
- Cultural and societal factors
- Group dynamics and interactions
- Social implications and consequences`,
            
            'geography': `For this geographical topic, include:
- Spatial relationships and patterns
- Environmental factors and processes
- Human-environment interactions
- Regional characteristics and differences
- Geographic data and mapping`,
            
            'political-science': `For this political science topic, include:
- Political theories and ideologies
- Government structures and processes
- Policy analysis and implications
- International relations and diplomacy
- Political behavior and participation`,
            
            'arts': `For this arts topic, include:
- Artistic techniques and methods
- Historical context and influences
- Cultural significance and meaning
- Critical analysis and interpretation
- Contemporary relevance and impact`
        };
        
        return instructions[subject] || `Provide comprehensive academic analysis with:
- Theoretical frameworks and concepts
- Research evidence and studies
- Critical analysis and evaluation
- Practical applications and implications
- Current state of knowledge in the field`;
    }

    // Get current events instructions
    getCurrentEventsInstructions(subject, topic) {
        const instructions = {
            'environmental': `For this environmental topic, include:
- Current environmental data and statistics
- Scientific consensus and research findings
- Policy responses and international agreements
- Economic and social impacts
- Future projections and solutions`,
            
            'technology': `For this technology topic, include:
- Current technological developments and trends
- Innovation and breakthrough technologies
- Industry applications and market impact
- Ethical considerations and challenges
- Future implications and predictions`,
            
            'politics': `For this political topic, include:
- Current political developments and events
- Policy analysis and implications
- Stakeholder perspectives and interests
- Historical context and precedents
- Future political implications`,
            
            'health': `For this health topic, include:
- Current health data and statistics
- Medical research and clinical findings
- Public health implications and policies
- Treatment options and prevention strategies
- Future health considerations`,
            
            'education': `For this education topic, include:
- Current educational trends and developments
- Learning methodologies and technologies
- Student performance and outcomes
- Educational policy and reform
- Future of education and learning`
        };
        
        return instructions[subject] || `Provide current, accurate information with:
- Recent developments and trends
- Factual data and statistics
- Multiple perspectives and viewpoints
- Real-world implications and effects
- Future outlook and considerations`;
    }

    // Get professional instructions
    getProfessionalInstructions(subject, topic) {
        const instructions = {
            'business': `For this business topic, include:
- Industry trends and market analysis
- Business strategies and best practices
- Case studies and real-world examples
- Economic factors and market conditions
- Future business implications`,
            
            'education': `For this education topic, include:
- Current educational practices and policies
- Learning theories and methodologies
- Student outcomes and assessment data
- Educational technology and innovation
- Future educational trends and challenges`,
            
            'law': `For this legal topic, include:
- Legal principles and precedents
- Case law and judicial decisions
- Statutory frameworks and regulations
- Legal analysis and interpretation
- Practical implications and applications`,
            
            'medicine': `For this medical topic, include:
- Medical principles and practices
- Clinical evidence and research
- Treatment protocols and guidelines
- Patient care and outcomes
- Healthcare systems and policies`
        };
        
        return instructions[subject] || `Provide professional analysis with:
- Industry-specific knowledge and expertise
- Practical applications and case studies
- Best practices and recommendations
- Current trends and developments
- Professional implications and considerations`;
    }

    // Get general instructions
    getGeneralInstructions(topic) {
        const instructions = {
            'sports': `For this sports topic, include:
- Performance analysis and statistics
- Training methods and techniques
- Historical context and achievements
- Current trends and developments
- Impact on society and culture`,
            
            'general': `Provide comprehensive coverage of "${topic}" including:
- Key concepts and definitions
- Important facts and information
- Relevant examples and applications
- Current understanding and developments
- Practical significance and implications`
        };
        
        return instructions['general'];
    }

    // Get general instructions
    getGeneralInstructions(topic) {
        return `Provide comprehensive coverage of "${topic}" including:
- Key concepts and definitions
- Important facts and information
- Relevant examples and applications
- Current understanding and developments
- Practical significance and implications`;
    }

    // Get assignment type specific instructions
    getAssignmentTypeInstructions(assignmentType, topic, customType = '') {
        const instructions = {
            'essay': `Write this as a formal academic essay about "${topic}":
- Present a clear thesis statement
- Develop coherent arguments with supporting evidence
- Use logical structure and flow
- Include critical analysis and evaluation
- Conclude with synthesis of main points`,
            
            'report': `Write this as a comprehensive report about "${topic}":
- Include executive summary or overview
- Present findings in organized sections
- Use data, statistics, and evidence
- Provide clear recommendations
- Use professional, objective tone`,
            
            'analysis': `Write this as a detailed analysis of "${topic}":
- Break down complex concepts systematically
- Examine multiple perspectives and viewpoints
- Provide in-depth examination of key aspects
- Include critical evaluation and assessment
- Draw conclusions based on analysis`,
            
            'research': `Write this as a research paper about "${topic}":
- Include literature review and background
- Present research methodology and findings
- Use academic citations and references
- Provide comprehensive discussion
- Include implications for future research`,
            
            'summary': `Write this as a comprehensive summary of "${topic}":
- Condense key information and main points
- Maintain accuracy and completeness
- Organize information logically
- Highlight most important aspects
- Provide clear overview for readers`,
            
            'discussion': `Write this as a discussion piece about "${topic}":
- Explore different viewpoints and perspectives
- Encourage critical thinking and debate
- Present balanced arguments
- Consider implications and consequences
- Engage readers in thoughtful consideration`,
            
            'case-study': `Write this as a case study about "${topic}":
- Present detailed examination of specific example
- Include background context and situation
- Analyze key factors and outcomes
- Draw lessons and insights
- Provide practical applications`,
            
            'literature-review': `Write this as a literature review about "${topic}":
- Survey existing research and literature
- Identify key themes and trends
- Evaluate strengths and limitations
- Identify gaps in current knowledge
- Suggest directions for future research`,
            
            'other': `Write this as a ${customType} about "${topic}":
- Follow the specific format and style appropriate for ${customType}
- Adapt the content structure to match ${customType} requirements
- Use appropriate tone and language for ${customType}
- Include relevant elements and features typical of ${customType}
- Ensure the content meets the expectations and standards of ${customType}`
        };
        
        return instructions[assignmentType] || instructions['essay'];
    }

    // Get academic content structure
    getAcademicStructure(wordCount, subject) {
        const intro = Math.round(wordCount * 0.15);
        const body = Math.round(wordCount * 0.7);
        const conclusion = Math.round(wordCount * 0.15);
        
        return `1. INTRODUCTION (${intro} words):
   - Clear topic definition and scope
   - Background context and significance
   - Thesis statement or main argument
   - Preview of key points to be discussed

2. MAIN BODY (${body} words) - 3-4 detailed sections:
   - Section 1: Core concepts and theoretical framework
   - Section 2: Evidence, research, and supporting data
   - Section 3: Analysis, interpretation, and critical evaluation
   - Section 4: Applications, implications, and real-world relevance

3. CONCLUSION (${conclusion} words):
   - Summary of key findings and arguments
   - Synthesis of main points
   - Broader implications and significance
   - Future considerations or recommendations`;
    }

    // Get current events structure
    getCurrentEventsStructure(wordCount, subject) {
        const intro = Math.round(wordCount * 0.15);
        const body = Math.round(wordCount * 0.7);
        const conclusion = Math.round(wordCount * 0.15);
        
        return `1. INTRODUCTION (${intro} words):
   - Current situation and context
   - Why this topic is important now
   - Key issues and challenges
   - Preview of analysis to follow

2. MAIN BODY (${body} words) - 3-4 comprehensive sections:
   - Section 1: Current state and recent developments
   - Section 2: Causes, factors, and contributing elements
   - Section 3: Impacts and consequences
   - Section 4: Responses, solutions, and future outlook

3. CONCLUSION (${conclusion} words):
   - Summary of current situation
   - Key insights and implications
   - Future projections and recommendations
   - Broader significance and lessons learned`;
    }

    // Get professional structure
    getProfessionalStructure(wordCount, subject) {
        const intro = Math.round(wordCount * 0.15);
        const body = Math.round(wordCount * 0.7);
        const conclusion = Math.round(wordCount * 0.15);
        
        return `1. INTRODUCTION (${intro} words):
   - Topic overview and business context
   - Current challenges and opportunities
   - Scope and objectives of analysis
   - Preview of key insights

2. MAIN BODY (${body} words) - 3-4 detailed sections:
   - Section 1: Current landscape and trends
   - Section 2: Analysis of key factors and drivers
   - Section 3: Best practices and successful strategies
   - Section 4: Future outlook and recommendations

3. CONCLUSION (${conclusion} words):
   - Summary of key findings
   - Strategic implications and recommendations
   - Action items and next steps
   - Long-term considerations`;
    }

    // Get general structure
    getGeneralStructure(wordCount) {
        const intro = Math.round(wordCount * 0.15);
        const body = Math.round(wordCount * 0.7);
        const conclusion = Math.round(wordCount * 0.15);
        
        return `1. INTRODUCTION (${intro} words):
   - Topic introduction and definition
   - Importance and relevance
   - Scope of discussion
   - Preview of main points

2. MAIN BODY (${body} words) - 3-4 comprehensive sections:
   - Section 1: Core concepts and fundamentals
   - Section 2: Detailed analysis and exploration
   - Section 3: Examples and applications
   - Section 4: Implications and significance

3. CONCLUSION (${conclusion} words):
   - Summary of key points
   - Synthesis of main ideas
   - Broader implications
   - Final thoughts and considerations`;
    }

    // Get assignment type specific structure
    getAssignmentTypeStructure(wordCount, assignmentType, subject, customType = '') {
        const intro = Math.round(wordCount * 0.15);
        const body = Math.round(wordCount * 0.7);
        const conclusion = Math.round(wordCount * 0.15);
        
        const structures = {
            'essay': `1. INTRODUCTION (${intro} words):
   - Hook and background context
   - Clear thesis statement
   - Preview of main arguments
   - Scope and approach

2. MAIN BODY (${body} words) - 3-4 argumentative sections:
   - Section 1: First main argument with evidence
   - Section 2: Second main argument with evidence
   - Section 3: Third main argument with evidence
   - Section 4: Counterarguments and rebuttals

3. CONCLUSION (${conclusion} words):
   - Restate thesis in new words
   - Summarize key arguments
   - Broader implications
   - Final thoughts and call to action`,
            
            'report': `1. EXECUTIVE SUMMARY (${Math.round(intro * 0.6)} words):
   - Key findings and recommendations
   - Brief overview of content

2. INTRODUCTION (${Math.round(intro * 0.4)} words):
   - Purpose and objectives
   - Scope and methodology
   - Background context

3. MAIN BODY (${body} words) - 4-5 detailed sections:
   - Section 1: Background and context
   - Section 2: Methodology and approach
   - Section 3: Findings and results
   - Section 4: Analysis and interpretation
   - Section 5: Implications and significance

4. CONCLUSION (${conclusion} words):
   - Summary of key findings
   - Recommendations and next steps
   - Limitations and future considerations`,
            
            'analysis': `1. INTRODUCTION (${intro} words):
   - Topic overview and significance
   - Analysis framework and approach
   - Key questions to be addressed
   - Preview of analysis structure

2. MAIN BODY (${body} words) - 4-5 analytical sections:
   - Section 1: Context and background analysis
   - Section 2: Detailed examination of key aspects
   - Section 3: Comparative analysis and perspectives
   - Section 4: Critical evaluation and assessment
   - Section 5: Synthesis and integration

3. CONCLUSION (${conclusion} words):
   - Summary of analytical findings
   - Key insights and conclusions
   - Implications and recommendations
   - Areas for further analysis`,
            
            'research': `1. INTRODUCTION (${intro} words):
   - Research problem and significance
   - Literature review summary
   - Research questions and objectives
   - Methodology overview

2. MAIN BODY (${body} words) - 5-6 comprehensive sections:
   - Section 1: Literature review and theoretical framework
   - Section 2: Research methodology and design
   - Section 3: Data collection and analysis
   - Section 4: Results and findings
   - Section 5: Discussion and interpretation
   - Section 6: Implications and applications

3. CONCLUSION (${conclusion} words):
   - Summary of research contributions
   - Limitations and future research directions
   - Practical implications and recommendations`,
            
            'summary': `1. INTRODUCTION (${intro} words):
   - Topic overview and scope
   - Purpose of summary
   - Key themes to be covered
   - Organization of content

2. MAIN BODY (${body} words) - 3-4 summary sections:
   - Section 1: Key concepts and definitions
   - Section 2: Main points and findings
   - Section 3: Important details and examples
   - Section 4: Implications and significance

3. CONCLUSION (${conclusion} words):
   - Summary of main points
   - Key takeaways and insights
   - Broader context and significance`,
            
            'discussion': `1. INTRODUCTION (${intro} words):
   - Topic introduction and context
   - Discussion framework and approach
   - Key issues to be explored
   - Multiple perspectives to be considered

2. MAIN BODY (${body} words) - 4-5 discussion sections:
   - Section 1: Background and context
   - Section 2: First perspective or viewpoint
   - Section 3: Second perspective or viewpoint
   - Section 4: Third perspective or viewpoint
   - Section 5: Synthesis and integration

3. CONCLUSION (${conclusion} words):
   - Summary of discussion points
   - Balanced conclusions and insights
   - Implications and recommendations
   - Areas for further discussion`,
            
            'case-study': `1. INTRODUCTION (${intro} words):
   - Case study overview and context
   - Key issues and questions
   - Methodology and approach
   - Structure and organization

2. MAIN BODY (${body} words) - 4-5 detailed sections:
   - Section 1: Background and context
   - Section 2: Case description and situation
   - Section 3: Analysis of key factors
   - Section 4: Outcomes and results
   - Section 5: Lessons and insights

3. CONCLUSION (${conclusion} words):
   - Summary of case study findings
   - Key lessons and implications
   - Recommendations and applications
   - Broader significance and relevance`,
            
            'literature-review': `1. INTRODUCTION (${intro} words):
   - Research area and scope
   - Review objectives and approach
   - Key themes and questions
   - Organization and structure

2. MAIN BODY (${body} words) - 4-5 thematic sections:
   - Section 1: Historical development and background
   - Section 2: Current state of research
   - Section 3: Key findings and contributions
   - Section 4: Gaps and limitations
   - Section 5: Future directions and opportunities

3. CONCLUSION (${conclusion} words):
   - Summary of literature review
   - Key themes and trends
   - Research gaps and opportunities
   - Implications for future research`
        };
        
        if (assignmentType === 'other' && customType) {
            return `1. INTRODUCTION (${intro} words):
   - Topic introduction and context
   - Purpose and scope of the ${customType}
   - Key elements to be covered
   - Preview of main content

2. MAIN BODY (${body} words) - 3-4 comprehensive sections:
   - Section 1: Core content and main points
   - Section 2: Detailed exploration and development
   - Section 3: Examples, applications, or analysis
   - Section 4: Additional insights and perspectives

3. CONCLUSION (${conclusion} words):
   - Summary of key points
   - Final thoughts and insights
   - Broader implications or applications
   - Closing remarks appropriate for ${customType}`;
        }
        
        return structures[assignmentType] || structures['essay'];
    }

    // Generate assignment with improved accuracy
    async generateAssignment(topic, wordCount, assignmentType = 'essay', customType = '') {
        const prompt = this.generatePrompt(topic, wordCount, assignmentType, customType);
        
        try {
            const generatedText = await this.generateContent(prompt);
            
            // Validate the generated content
            const wordCountGenerated = generatedText.trim().split(/\s+/).length;
            const accuracy = this.validateContentAccuracy(generatedText, topic);
            
            console.log(`Generated ${wordCountGenerated} words (target: ${wordCount})`);
            console.log(`Content accuracy score: ${accuracy.score}/10`);
            const assignmentTypeText = assignmentType === 'other' ? customType : assignmentType;
            console.log(`Assignment type: ${assignmentTypeText}`);
            
            // If content is too short or inaccurate, try to improve it
            if (wordCountGenerated < wordCount * 0.8 || accuracy.score < 7) {
                console.log('Content needs improvement, attempting enhancement...');
                return await this.improveContent(generatedText, topic, wordCount, assignmentType, customType);
            }
            
            return generatedText;
        } catch (error) {
            console.error('Error generating assignment:', error);
            throw error;
        }
    }

    // Validate content accuracy and relevance
    validateContentAccuracy(content, topic) {
        const topicWords = topic.toLowerCase().split(/\s+/);
        const contentLower = content.toLowerCase();
        
        let relevanceScore = 0;
        let specificityScore = 0;
        let structureScore = 0;
        
        // Check topic relevance
        topicWords.forEach(word => {
            if (contentLower.includes(word)) {
                relevanceScore += 1;
            }
        });
        relevanceScore = (relevanceScore / topicWords.length) * 5;
        
        // Check for specific details (numbers, dates, names)
        const specificDetails = (content.match(/\d+/g) || []).length;
        const properNouns = (content.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g) || []).length;
        specificityScore = Math.min(5, (specificDetails + properNouns) / 10);
        
        // Check structure
        const hasIntro = contentLower.includes('introduction') || contentLower.includes('introducing');
        const hasConclusion = contentLower.includes('conclusion') || contentLower.includes('concluding');
        const hasSections = (content.match(/\n\n/g) || []).length >= 3;
        structureScore = (hasIntro ? 1 : 0) + (hasConclusion ? 1 : 0) + (hasSections ? 3 : 0);
        
        return {
            score: Math.round((relevanceScore + specificityScore + structureScore) / 3),
            relevance: relevanceScore,
            specificity: specificityScore,
            structure: structureScore
        };
    }

    // Improve content if it's not accurate enough
    async improveContent(existingContent, topic, targetWordCount, assignmentType = 'essay', customType = '') {
        const assignmentTypeText = assignmentType === 'other' ? customType : assignmentType;
        const improvementPrompt = `The following content about "${topic}" needs improvement. Please rewrite it to be more accurate, specific, and comprehensive.

Current content:
${existingContent}

IMPROVEMENT REQUIREMENTS:
- Make the content more specific to "${topic}"
- Add concrete examples, data, and evidence
- Ensure all information is accurate and current
- Improve the structure and flow
- Target approximately ${targetWordCount} words
- Focus on providing detailed, relevant information about "${topic}"
- Follow the format and style appropriate for a ${assignmentTypeText}

Rewrite the entire content with these improvements:`;

        try {
            const improvedContent = await this.generateContent(improvementPrompt);
            return improvedContent;
        } catch (error) {
            console.error('Error improving content:', error);
            return existingContent;
        }
    }

    // Make API call to Gemini with improved parameters
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
                temperature: 0.7, // Reduced for more consistent output
                topK: 40,
                topP: 0.9,
                maxOutputTokens: 32768,
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
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

// Main function to generate assignment with improved accuracy
async function generateAssignment() {
    try {
        // Clear any previous errors
        geminiGenerator.clearError();
        
        // Get user inputs
        const topic = document.getElementById('topicField').value.trim();
        const assignmentType = document.getElementById('assignmentType').value || 'essay';
        const customType = document.getElementById('customTypeField')?.value?.trim() || '';
        const wordCount = parseInt(document.getElementById('wordCount').value) || 1000;
        const apiKey = document.getElementById('apiKey').value.trim();

        // Validation
        if (!topic) {
            geminiGenerator.showError('Please enter an assignment topic');
            return;
        }

        if (assignmentType === 'other' && !customType) {
            geminiGenerator.showError('Please enter a custom assignment type');
            return;
        }

        if (!apiKey) {
            geminiGenerator.showError('Please enter your Gemini API key');
            return;
        }

        if (wordCount < 100 || wordCount > 10000) {
            geminiGenerator.showError('Word count must be between 100 and 10,000');
            return;
        }

        // Save API key
        geminiGenerator.saveApiKey(apiKey);

        // Show loading state
        geminiGenerator.showLoading(true);
        const loadingDiv = document.getElementById('loadingIndicator');
        if (loadingDiv) {
            const assignmentTypeText = assignmentType === 'other' ? customType : assignmentType;
            loadingDiv.innerHTML = `<i class="fas fa-spinner fa-spin mr-1"></i> Analyzing topic and generating ${assignmentTypeText}...`;
        }

        // Generate assignment with improved accuracy
        const generatedText = await geminiGenerator.generateAssignment(topic, wordCount, assignmentType, customType);
        
        // Log final word count
        const finalWordCount = generatedText.trim().split(/\s+/).length;
        console.log(`Final generated content: ${finalWordCount} words (target: ${wordCount})`);

        // Process the generated text with typewriter effect
        await processGeneratedAssignmentWithTypewriter(generatedText);

        // Show success message
        const assignmentTypeText = assignmentType === 'other' ? customType : assignmentType;
        showSuccessMessage(`${assignmentTypeText.charAt(0).toUpperCase() + assignmentTypeText.slice(1)} generated successfully with improved accuracy!`);

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

// Toggle custom assignment type input
function toggleCustomType() {
    const assignmentType = document.getElementById('assignmentType').value;
    const customContainer = document.getElementById('customTypeContainer');
    const customField = document.getElementById('customTypeField');
    
    if (assignmentType === 'other') {
        customContainer.classList.remove('hidden');
        customField.required = true;
        customField.focus();
    } else {
        customContainer.classList.add('hidden');
        customField.required = false;
        customField.value = '';
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

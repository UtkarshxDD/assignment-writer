#Use here : [https://vercel.com/utkarsh-singhs-projects-e5b9c656/assignment-writer](https://assignment-writer-beryl.vercel.app/)

# AI Assignment Generation Feature

## Overview
The Assignment Express application now includes an intelligent AI-powered assignment generation feature using Google's Gemini API. This enhancement allows students to automatically generate high-quality assignments on any topic with proper formatting and multi-page support.

## Key Features

### 🤖 AI Assignment Generator
- **Topic-based Generation**: Enter any topic and get a well-structured assignment
- **Multiple Assignment Types**: Essay, Report, Summary, Analysis, Research Paper
- **Customizable Word Count**: 250, 500, 750, 1000, or 1500 words
- **Intelligent Formatting**: Proper academic structure with introduction, body, and conclusion

### 📄 Multi-Page Management System
- **Automatic Page Distribution**: Large assignments are automatically split across multiple pages
- **Interactive Page Navigation**: Previous/Next buttons with page indicators
- **Page Management**: Add, delete, and organize pages
- **Bulk Download**: Download all pages at once

### ✍️ Enhanced Text Rendering
- **Page-Specific Settings**: Each page maintains its own formatting settings
- **Real-time Preview**: See changes instantly as you navigate between pages
- **Consistent Formatting**: Maintains handwriting style across all pages

## How to Use

### Setting Up Gemini API

1. **Get API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) to get your Gemini API key
2. **Enter API Key**: Input your API key in the "Gemini API Key" field
3. **Key Storage**: Your API key is securely stored in browser localStorage for future use

### Generating Assignments

1. **Enter Topic**: Type your assignment topic (e.g., "Climate Change Effects", "Shakespeare's Hamlet")
2. **Select Type**: Choose from Essay, Report, Summary, Analysis, or Research Paper
3. **Choose Length**: Select desired word count (250-1500 words)
4. **Generate**: Click "Generate Assignment" and wait for AI to create your content
5. **Review**: The generated text appears in the manual text area and on the canvas

### Managing Multiple Pages

1. **Automatic Split**: Large assignments are automatically divided across pages
2. **Navigate Pages**: Use Previous/Next buttons to move between pages
3. **Page Indicator**: Shows current page number and total pages
4. **Add Pages**: Manually add new pages using the "Add Page" button
5. **Delete Pages**: Remove unwanted pages (minimum 1 page required)
6. **Download All**: Download all pages as separate image files

### Customizing Each Page

1. **Individual Settings**: Each page maintains its own:
   - X/Y axis position
   - Font size
   - Text width
   - Line spacing
   - Background image

2. **Shared Settings**: Font selection applies to all pages
3. **Real-time Updates**: Changes apply immediately to the current page

## Technical Implementation

### API Integration
- **Gemini Pro Model**: Uses Google's latest Gemini Pro model
- **Error Handling**: Comprehensive error messages and validation
- **Rate Limiting**: Respects API rate limits with loading indicators
- **Secure Storage**: API keys stored locally, never transmitted to external servers

### Page Management
- **Data Structure**: Each page stores text content and formatting settings
- **Memory Efficient**: Only active page data is rendered
- **State Persistence**: Settings maintained when switching between pages
- **Auto-Save**: Page data automatically saved when navigating

### Text Distribution Algorithm
- **Word-Based Splitting**: Intelligently splits text at word boundaries
- **Character Limits**: Approximately 800 characters per page for optimal readability
- **Overflow Handling**: Long paragraphs are gracefully split across pages
- **Formatting Preservation**: Maintains paragraph structure and spacing

## User Interface

### AI Section Features
- Clean, intuitive form layout
- Real-time validation feedback
- Loading indicators during generation
- Success/error message display
- Responsive design for mobile devices

### Page Navigation
- Visual page indicator
- Disabled state for navigation buttons at boundaries
- Keyboard shortcuts support (planned for future update)
- Smooth transitions between pages

### Error Handling
- **API Errors**: Clear messages for authentication, quota, and network issues
- **Validation**: Real-time form validation with helpful hints
- **Fallback**: Graceful degradation if AI service is unavailable
- **User Guidance**: Step-by-step instructions for setup and usage

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 80+ (recommended)
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Mobile Support
- ✅ iOS Safari 13+
- ✅ Chrome Mobile 80+
- ✅ Samsung Internet 10+

## Privacy & Security

### Data Protection
- **Local Processing**: All text processing happens in the browser
- **No Server Storage**: Generated content is not stored on external servers
- **API Key Security**: Keys stored locally using browser localStorage
- **HTTPS Required**: Secure connection required for API calls

### Terms of Use
- **Educational Purpose**: Intended for educational and learning purposes
- **Content Responsibility**: Users responsible for generated content appropriateness
- **API Usage**: Subject to Google's Gemini API terms and conditions
- **Attribution**: Consider citing AI assistance in academic work as per institution policies

## Troubleshooting

### Common Issues

1. **API Key Invalid**
   - Verify key from Google AI Studio
   - Check for extra spaces or characters
   - Ensure API is enabled for your account

2. **Generation Failed**
   - Check internet connection
   - Verify API quota limits
   - Try shorter or different topic

3. **Pages Not Loading**
   - Refresh the page
   - Clear browser cache
   - Check browser console for errors

4. **Text Not Displaying**
   - Ensure page manager is initialized
   - Check canvas rendering
   - Verify font loading

### Support
For technical issues or feature requests, please check the browser console for error messages and ensure all JavaScript files are properly loaded.

## Future Enhancements

### Planned Features
- **Custom Prompts**: User-defined generation prompts
- **Citation Generation**: Automatic bibliography creation
- **Export Formats**: PDF, DOCX export options
- **Template Library**: Pre-designed page templates
- **Collaboration**: Share assignments with others
- **Version History**: Track assignment revisions

### Performance Improvements
- **Lazy Loading**: Load pages on demand
- **Caching**: Cache generated content locally
- **Compression**: Optimize image downloads
- **Background Processing**: Generate pages in background

## API Rate Limits & Costs

### Gemini API Limits
- **Free Tier**: 15 requests per minute, 1500 requests per day
- **Paid Tier**: Higher limits available
- **Content Limits**: Maximum 2048 tokens per response

### Cost Optimization
- **Smart Prompting**: Efficient prompt design to minimize token usage
- **Caching**: Avoid regenerating identical content
- **Batching**: Combine multiple requests when possible

---

*This feature enhances Assignment Express with cutting-edge AI capabilities while maintaining the core handwriting simulation functionality that makes the tool unique.*


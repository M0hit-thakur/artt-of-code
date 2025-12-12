# AI Chatbot Backend

A Node.js backend service that integrates with AI providers (OpenAI, Anthropic Claude) to power the chatbot frontend.

## Features

- 🤖 OpenAI GPT-3.5-turbo integration
- 🧠 Anthropic Claude integration (alternative)
- 💬 Conversation history management
- 🔒 Environment-based configuration
- 🚀 Express.js REST API
- 🌐 CORS enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy the example environment file and configure your API keys:

```bash
cp env.example .env
```

Edit `.env` and add your API keys:

```env
# Required: OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Anthropic Claude API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Get API Keys

#### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

#### Anthropic Claude API Key (Optional)
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### 4. Start the Backend

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### POST `/api/chat`
Main chat endpoint using OpenAI

**Request:**
```json
{
  "message": "Hello, how are you?",
  "conversationId": "optional-conversation-id"
}
```

**Response:**
```json
{
  "response": "Hello! I'm doing well, thank you for asking. How can I help you today?",
  "conversationId": "optional-conversation-id"
}
```

### POST `/api/chat/claude`
Alternative endpoint using Anthropic Claude

**Request:** Same as above
**Response:** Same format as above

### GET `/api/health`
Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "aiConfigured": true
}
```

## Frontend Integration

The frontend is already configured to connect to this backend. Make sure:

1. Backend is running on port 5000
2. Frontend is running on port 5173 (Vite default)
3. CORS is properly configured in `.env`

## Error Handling

The backend includes comprehensive error handling for:
- Missing API keys
- API quota exceeded
- Network errors
- Invalid requests

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production`
2. Use a proper database for conversation storage
3. Implement rate limiting
4. Add authentication if needed
5. Use environment variables for all sensitive data

## Troubleshooting

### Common Issues

1. **"AI service not configured"**
   - Check that your API key is set in `.env`
   - Verify the API key is valid

2. **CORS errors**
   - Ensure `FRONTEND_URL` is set correctly in `.env`
   - Check that frontend is running on the expected port

3. **API quota exceeded**
   - Check your OpenAI/Anthropic account usage
   - Consider upgrading your plan

4. **Connection refused**
   - Ensure backend is running on port 5000
   - Check firewall settings

## Security Notes

- Never commit API keys to version control
- Use environment variables for all sensitive data
- Implement rate limiting for production use
- Consider adding authentication for user-specific conversations

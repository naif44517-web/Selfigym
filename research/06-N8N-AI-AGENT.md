# n8n AI Agent: Zero to Professional Guide
*Date: 2026-02-02*

---

## 📚 What is n8n?

**n8n** (pronounced "nodemation") is an open-source workflow automation tool that allows you to:
- Connect different apps and services
- Automate repetitive tasks
- Build AI-powered agents
- No/low code interface with code capability

### Why n8n for AI Agents?
- ✅ Visual workflow builder
- ✅ Built-in AI/LangChain integration
- ✅ 500+ integrations
- ✅ Self-hostable (data privacy)
- ✅ Free tier available
- ✅ Python/JavaScript support

---

## 🚀 Part 1: Getting Started

### Option A: Cloud (Easiest)
```
1. Go to n8n.io
2. Click "Get started free"
3. Create account
4. 14-day free trial (no credit card)
5. Access cloud dashboard
```

### Option B: Self-Hosted (Docker)
```bash
# Quick start with Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Access at http://localhost:5678
```

### Option C: Self-Hosted AI Starter Kit
```bash
# Clone the AI starter kit
git clone https://github.com/n8n-io/self-hosted-ai-starter-kit.git
cd self-hosted-ai-starter-kit

# Start with Docker Compose
docker compose up -d

# Includes: n8n, Ollama, Qdrant, PostgreSQL
```

---

## 🧠 Part 2: Understanding AI Concepts in n8n

### Key Terms

| Term | Definition |
|------|------------|
| **AI Agent** | Autonomous system that makes decisions and takes actions |
| **LLM** | Large Language Model (e.g., GPT-4, Claude) |
| **Tool** | External capability the agent can use (API, database, etc.) |
| **Vector Store** | Database for semantic search (embeddings) |
| **Memory** | Conversation history for context |
| **RAG** | Retrieval Augmented Generation (search + generate) |

### Agent vs LLM

| Feature | LLM | AI Agent |
|---------|-----|----------|
| Text generation | ✅ | ✅ |
| Decision making | ❌ | ✅ |
| Uses tools | ❌ | ✅ |
| Multi-step tasks | ❌ | ✅ |
| Autonomous | ❌ | ✅ |

---

## 🔧 Part 3: Building Your First AI Agent

### Step 1: Create New Workflow
```
1. Open n8n
2. Click "Add workflow"
3. Name it: "My First AI Agent"
```

### Step 2: Add Chat Trigger
```
1. Click "Add first step"
2. Search "Chat Trigger"
3. Add to canvas
4. This is where conversations start
```

### Step 3: Add AI Agent Node
```
1. Click + on Chat Trigger
2. Search "AI Agent"
3. Add to canvas
4. Configure:
   - Source: Define below
   - Prompt: "You are a helpful assistant"
```

### Step 4: Connect Chat Model
```
1. Click + under "Chat Model" on AI Agent
2. Choose your model:
   - OpenAI Chat Model (GPT-4, GPT-3.5)
   - Anthropic (Claude)
   - Google Gemini
   - Groq
   - Ollama (self-hosted)
   
3. Add credentials:
   - Get API key from provider
   - Add in n8n credentials
   
4. Configure model:
   - Model: gpt-4o-mini (cost-effective)
   - Temperature: 0.7 (creativity)
   - Max tokens: 1000
```

### Step 5: Test Your Agent
```
1. Click "Chat" button (bottom right)
2. Type a message
3. See response
4. Debug if needed
```

---

## 🛠️ Part 4: Adding Tools to Your Agent

Tools give your agent superpowers! It can now DO things, not just talk.

### Available Tool Types

#### 1. Calculator
```
Lets agent do math calculations
Use case: "What's 15% of 299?"
```

#### 2. Code Tool
```
Execute JavaScript/Python code
Use case: Complex data processing
```

#### 3. HTTP Request Tool
```
Call any REST API
Use case: Get weather, stock prices, etc.
```

#### 4. Vector Store Tool
```
Search through documents
Use case: RAG, knowledge base queries
```

#### 5. Custom n8n Workflow Tool
```
Call another n8n workflow
Use case: Complex multi-step operations
```

### Adding HTTP Tool Example
```
1. Click + under "Tool" on AI Agent
2. Select "HTTP Request Tool"
3. Configure:
   - Name: "Get Weather"
   - Description: "Gets current weather for a city"
   - Method: GET
   - URL: https://api.weather.com/...
   
4. The agent can now check weather!
```

### Adding Calculator Tool
```
1. Click + under "Tool"
2. Select "Calculator"
3. No configuration needed
4. Agent can now do math
```

---

## 💾 Part 5: Adding Memory (Conversation History)

Without memory, the agent forgets each conversation.

### Window Buffer Memory
```
1. Click + under "Memory" on AI Agent
2. Select "Window Buffer Memory"
3. Configure:
   - Context Window Length: 10 (remembers last 10 messages)
   - Session ID: Use expression for per-user memory
```

### PostgreSQL Memory (Persistent)
```
For production, use database-backed memory:

1. Select "Postgres Chat Memory"
2. Connect to your PostgreSQL
3. Configure:
   - Table: chat_history
   - Session ID Key: {{ $json.userId }}
```

---

## 📄 Part 6: RAG (Retrieval Augmented Generation)

RAG = Give your agent access to your documents/knowledge base.

### How RAG Works
```
1. Your documents → Split into chunks
2. Chunks → Convert to embeddings
3. Embeddings → Store in vector database
4. User asks question
5. Find relevant chunks (semantic search)
6. Send chunks + question to LLM
7. LLM generates answer using your data
```

### Setting Up RAG in n8n

#### Step 1: Create Document Ingestion Workflow
```
Trigger → Load Documents → Split Text → 
Generate Embeddings → Store in Vector DB
```

#### Step 2: Use in Agent
```
1. Add "Vector Store Tool" to agent
2. Connect to your vector store:
   - Pinecone
   - Qdrant
   - Supabase
   - In-Memory (testing)
3. Agent can now search your documents
```

### Example: SelfieGym Knowledge Base
```
Documents to ingest:
- Exercise descriptions
- Diet program details
- FAQ answers
- Workout instructions

User asks: "What's a good beginner chest workout?"
Agent searches → Finds relevant exercises → Answers with specifics
```

---

## 🔄 Part 7: Advanced Patterns

### Pattern 1: Multi-Agent System
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Router     │────→│  Specialist │────→│  Specialist │
│  Agent      │     │  Agent 1    │     │  Agent 2    │
└─────────────┘     └─────────────┘     └─────────────┘
                          │                   │
                          └───────┬───────────┘
                                  ▼
                          ┌─────────────┐
                          │  Response   │
                          │  Combiner   │
                          └─────────────┘

Use case: Different agents for different tasks
- Fitness questions → Fitness Agent
- Diet questions → Nutrition Agent
- General → General Agent
```

### Pattern 2: Human-in-the-Loop
```
Agent makes decision → Check if confident →
  If confident: Execute
  If not: Ask human for approval

Use case: Booking appointments, sending emails
```

### Pattern 3: Scheduled Agent
```
Cron Trigger (every hour) → Agent checks tasks →
If something needs attention → Notify user

Use case: Monitoring, alerts, periodic reports
```

---

## 🎯 Part 8: SelfieGym AI Agent Use Cases

### Use Case 1: Fitness Chatbot
```
Workflow:
Chat Trigger → AI Agent → Response

Agent has:
- Exercise knowledge base (RAG)
- Diet program database
- User profile access
- Workout logging tool

Example:
User: "I want to build muscle but I'm a beginner"
Agent: [Searches exercise DB] "Here's a perfect beginner 
       program for you: Full Body 3x/week..."
```

### Use Case 2: Workout Reminder Agent
```
Workflow:
Schedule Trigger (daily 8am) → AI Agent → 
Check user's workout schedule → Send WhatsApp reminder

Agent has:
- User schedule access
- WhatsApp sending tool
- Motivational messages
```

### Use Case 3: Progress Analysis Agent
```
Workflow:
Webhook (user logs workout) → AI Agent → 
Analyze progress → Suggest adjustments

Agent has:
- User history access
- Progress calculation tools
- Recommendation engine
```

### Use Case 4: Customer Support Agent
```
Workflow:
Chat/Email Trigger → AI Agent → 
Answer questions / Escalate to human

Agent has:
- FAQ knowledge base
- Subscription management tools
- Escalation workflow
```

---

## 📊 Part 9: Best Practices

### 1. Prompt Engineering
```
Good system prompt for fitness agent:

"You are SelfieGym's AI fitness trainer. 

Your role:
- Provide personalized workout advice
- Answer nutrition questions
- Motivate users
- Track progress

Rules:
- Always be encouraging
- Give specific, actionable advice
- Use Arabic if user writes in Arabic
- Recommend consulting a doctor for medical issues
- Use the tools available to look up exercises and programs

When recommending exercises:
1. Ask about fitness level
2. Ask about available equipment
3. Search exercise database for matches
4. Provide 3-5 options with instructions"
```

### 2. Error Handling
```
Always add:
- Try/Catch nodes for API failures
- Fallback responses
- Logging for debugging
- Rate limiting
```

### 3. Cost Optimization
```
- Use gpt-4o-mini instead of gpt-4 when possible
- Cache common responses
- Limit token usage
- Use local models (Ollama) for development
```

### 4. Security
```
- Never expose API keys
- Validate user input
- Rate limit requests
- Log suspicious activity
- Use proper authentication
```

---

## 📈 Part 10: From Zero to Professional Roadmap

### Week 1: Foundations
- [ ] Set up n8n (cloud or self-hosted)
- [ ] Complete basic tutorial
- [ ] Build simple chatbot
- [ ] Add one tool (calculator)

### Week 2: Intermediate
- [ ] Add memory to chatbot
- [ ] Connect to external API
- [ ] Build RAG system with sample docs
- [ ] Create scheduled workflow

### Week 3: Advanced
- [ ] Build multi-tool agent
- [ ] Implement error handling
- [ ] Add logging and monitoring
- [ ] Create workflow-as-tool

### Week 4: Production
- [ ] Optimize costs
- [ ] Add authentication
- [ ] Set up proper hosting
- [ ] Monitor and iterate

---

## 📚 Resources

### Official Documentation
- n8n Docs: docs.n8n.io
- AI Documentation: docs.n8n.io/advanced-ai/
- Workflow Templates: n8n.io/workflows

### Video Tutorials
- n8n YouTube Channel
- "Build AI Agents with n8n" series

### Community
- n8n Community Forum: community.n8n.io
- Discord: n8n.io/discord

### Templates to Start With
- AI Chatbot Template
- RAG with PDF Documents
- Customer Support Bot
- Slack/Teams Integration

---

## ✅ Quick Start Checklist

- [ ] Create n8n account (cloud)
- [ ] Get OpenAI API key
- [ ] Build first chat agent
- [ ] Add calculator tool
- [ ] Add memory
- [ ] Test with 10 conversations
- [ ] Deploy for production use

---

*This guide covers zero to professional n8n AI agent development.*
*Practice each section before moving to the next.*

# Agent Switching Guide
## How to Switch Between Agents in Simple Knowledge Chatbot

**Document Version:** 1.0
**Updated:** 2025-12-04

---

## Overview

The Simple Knowledge Chatbot now supports 4 different specialized agents, each with unique capabilities. You can easily switch between agents to get different types of responses based on your needs.

---

## Available Agents

### 1. Chat Assistant Agent (Default)
**ID:** `693174578f91bb17ff418457`
**Label:** Assistant
**Best For:** General conversation, Q&A, everyday help

**What it does:**
- Natural conversation and dialogue
- General information and answers
- Friendly and conversational tone
- Multi-turn context awareness
- Everyday questions

**Example Use Cases:**
- "What's the weather like?"
- "How do I make pasta?"
- "Tell me about your capabilities"
- Casual chatting and conversation

---

### 2. Research Agent
**ID:** `6931775c8f91bb17ff4187b6`
**Label:** Research
**Best For:** In-depth analysis, research, detailed information

**What it does:**
- Thorough research and analysis
- Detailed explanations with sources
- Multiple perspectives on topics
- Well-structured information
- Citations and references
- Deep dive into complex topics

**Example Use Cases:**
- "Research the history of AI"
- "Give me a detailed analysis of climate change"
- "Explain quantum computing comprehensively"
- "Compare different programming languages"

---

### 3. Creative Agent
**ID:** `693177628f91bb17ff4187bb`
**Label:** Creative
**Best For:** Brainstorming, storytelling, creative ideas

**What it does:**
- Brainstorming and ideation
- Story and narrative generation
- Creative problem-solving
- Unconventional thinking
- Original ideas and concepts
- Imaginative responses

**Example Use Cases:**
- "Help me brainstorm blog post ideas"
- "Write a short story about a robot"
- "Generate creative business names"
- "What's a unique way to solve this problem?"

---

### 4. Technical Agent
**ID:** `693177678f91bb17ff4187c0`
**Label:** Technical
**Best For:** Code, debugging, system design, technical problems

**What it does:**
- Code examples and solutions
- Technical debugging help
- System design recommendations
- Best practices and patterns
- Performance optimization
- Tool and framework recommendations

**Example Use Cases:**
- "How do I fix this JavaScript error?"
- "Write a function to sort an array"
- "Design a scalable database schema"
- "What's the best way to optimize this code?"

---

## How to Switch Agents

### Step 1: Open Agent Selector
Click the **Settings icon** (gear icon) in the top-right corner of the chat area.

**Location:** Top-right of the main chat header, next to the conversation title

### Step 2: View Available Agents
A dropdown menu will appear showing all 4 available agents:
- Assistant (General conversation)
- Research (In-depth analysis)
- Creative (Brainstorming)
- Technical (Code help)

Each agent shows:
- Agent name/label
- Description of what it's good for
- Current selection status (highlighted in blue)

### Step 3: Select Your Agent
Click on any agent to switch to it.

The current agent will be highlighted with a blue background.

### Step 4: Start New Conversation (Optional)
You can optionally start a fresh conversation with the selected agent by clicking:
**"Start New Chat with [Agent Name]"** button

This creates a new conversation with:
- Agent-specific welcome message
- Clean conversation history
- Agent name in conversation title

---

## Agent Switching Behavior

### What Happens When You Switch Agents

1. **Agent Selection Updates:** The header shows the newly selected agent
2. **Previous Conversations Remain:** Your old conversations are saved in the sidebar
3. **New Messages Use Selected Agent:** Messages you send will go to the newly selected agent
4. **Conversation History Context:** The agent can still see previous messages for context

### Important Notes

- Switching agents does NOT delete previous conversations
- Each conversation remembers which agent was used for it
- You can switch agents mid-conversation (agent will respond based on its role)
- Previous conversations in sidebar still exist and are searchable
- Agent selector closes after you select an agent

---

## Practical Example Workflow

### Scenario: Research a Topic Then Brainstorm Ideas

**Step 1: Start with Research Agent**
- Click Settings icon
- Select "Research Agent"
- Ask: "Research the current state of renewable energy"
- Get detailed, sourced analysis

**Step 2: Switch to Creative Agent**
- Click Settings icon
- Select "Creative Agent"
- Ask: "Based on what we discussed, brainstorm innovative renewable energy startup ideas"
- Get creative, unconventional ideas

**Step 3: Switch to Technical Agent**
- Click Settings icon
- Select "Technical Agent"
- Ask: "How would I build a web platform to track these renewable energy projects?"
- Get technical implementation guidance

**All conversations saved:** You can click on any of the 3 conversations in the sidebar to review

---

## Agent Selection Display

### In the Chat Header
You'll see:
```
Conversation Title
Current Agent: [Agent Label]
```

Example:
```
Research Conversation
Current Agent: Research
```

### Agent Selector Panel
When clicked, shows:
```
Switch Agent:

[Assistant]  [Research]
[Creative]   [Technical]

Start New Chat with [Agent Name]
```

---

## Tips for Best Results

### Choose the Right Agent for Your Task

| Task | Recommended Agent |
|------|-------------------|
| General questions | Assistant |
| Learning deeply | Research |
| Generating ideas | Creative |
| Coding problems | Technical |
| Brainstorming | Creative |
| Debugging | Technical |
| Multiple perspectives | Research |
| Quick answers | Assistant |

### Conversation Strategy

1. **Multi-Agent Workflow:** Use different agents sequentially for comprehensive results
2. **Leverage Context:** Later agents can see earlier messages and build on them
3. **Specialized Expertise:** Switch to Technical Agent for code, Research for details
4. **Document Your Work:** All conversations stay in history for reference

### Best Practices

- Use Research Agent first to understand a topic deeply
- Use Creative Agent to brainstorm solutions
- Use Technical Agent to implement technical solutions
- Use Assistant for quick clarifications
- Keep related conversations together or start fresh depending on focus

---

## Agent Memory & Context

### What Each Agent Remembers

**Chat Assistant Agent:**
- Enabled conversation memory
- Retains context across multiple turns
- Good for ongoing dialogue

**Research Agent:**
- No persistent memory by default
- Can see conversation history passed in context
- Better for focused research topics

**Creative Agent:**
- No persistent memory by default
- Uses context from conversation history
- Fresh perspective for each response

**Technical Agent:**
- No persistent memory by default
- Can reference code examples in history
- Maintains technical context for solutions

### Passing Context Between Agents

When you switch agents:
- Previous messages are visible in the conversation
- New agent can read and reference them
- Conversation history is automatically formatted and passed
- All agents see the full message history

---

## Switching Within the Same Conversation

### You Can:
- Start a conversation with Agent A
- Switch to Agent B mid-conversation
- Agent B will see all previous messages
- Continue conversation with Agent B
- Switch back to Agent A if needed

### The System Will:
- Remember which agent each message came from
- Keep all messages in history
- Show agent name in header when you switch
- Apply the new agent's expertise to your question

### Example:
```
1. User: "Tell me about Python" (using Assistant)
2. Assistant responds...
3. User switches to Research Agent
4. User: "Dive deeper into Python's async programming"
5. Research Agent responds with detailed analysis
6. User switches to Technical Agent
7. User: "Show me how to write async code in Python"
8. Technical Agent provides code examples
```

---

## Troubleshooting

### Agent Not Responding
- Check that an agent is selected in the header
- Try refreshing the page
- Verify internet connection
- Check browser console for errors

### Agent Selector Not Opening
- Click the Settings icon (gear) in top-right
- Make sure you're clicking in the right location
- Try closing and reopening

### Want to Clear History
- Use the delete button (trash icon) in sidebar
- This deletes the entire conversation
- Agent selection remains the same

### Agent Selection Stuck
- Click Settings icon to toggle selector
- Select a different agent
- Then reselect your preferred agent

---

## Agent Capabilities Matrix

| Feature | Chat | Research | Creative | Technical |
|---------|------|----------|----------|-----------|
| Multi-turn context | Yes | Via history | Via history | Via history |
| Detailed analysis | Good | Excellent | Good | Excellent |
| Code examples | Basic | None | None | Excellent |
| Creative ideas | Good | Good | Excellent | Fair |
| Technical depth | Fair | Good | Fair | Excellent |
| Sources/refs | Basic | Excellent | Basic | Good |
| Quick answers | Excellent | Fair | Good | Fair |
| Conversation memory | Persistent | Limited | Limited | Limited |

---

## API Integration (For Developers)

### How Agent Switching Works in Code

```javascript
// Selected agent ID
const selectedAgentId = '693174578f91bb17ff418457' // or other agent IDs

// Send message to selected agent
const response = await fetch('/api/agent', {
  method: 'POST',
  body: JSON.stringify({
    message: userInput,
    agent_id: selectedAgentId,  // Uses selected agent ID
    session_id: conversationId,
    user_id: 'default-user',
    conversation_context: formattedHistory
  })
})
```

### Agent ID Constants
```javascript
const CHAT_AGENT_ID = '693174578f91bb17ff418457'
const RESEARCH_AGENT_ID = '6931775c8f91bb17ff4187b6'
const CREATIVE_AGENT_ID = '693177628f91bb17ff4187bb'
const TECHNICAL_AGENT_ID = '693177678f91bb17ff4187c0'
```

---

## Keyboard Shortcuts (Future Enhancement)

Currently available through UI. Future versions may include:
- Press `Ctrl+1` for Assistant Agent
- Press `Ctrl+2` for Research Agent
- Press `Ctrl+3` for Creative Agent
- Press `Ctrl+4` for Technical Agent

---

## Feedback & Suggestions

If you have suggestions for:
- New agent types
- Improved agent capabilities
- Better UI for agent selection
- Additional features

Please provide feedback through the application.

---

## FAQ

**Q: Can I use multiple agents in one conversation?**
A: Yes! Switch agents anytime. Each agent sees the full conversation history and can build on previous responses.

**Q: Do agents have their own conversation history?**
A: No, all agents share the same conversation. They just respond differently based on their role.

**Q: If I switch agents, do my old conversations disappear?**
A: No, old conversations stay in the sidebar. They show which agent they were using.

**Q: Can I have different agents for different conversations?**
A: Yes! Create a new conversation with each agent. Each conversation remembers its agent.

**Q: Does switching agents require re-logging?**
A: No, agent switching is instant. No authentication needed.

**Q: Can I create custom agents?**
A: Currently using 4 built-in agents. Custom agents can be added through Lyzr Studio.

**Q: What if an agent doesn't understand my question?**
A: Try the Assistant Agent or rephrase your question. Different agents may interpret questions differently.

**Q: Can agents see my previous conversations?**
A: Only within the current conversation. Previous conversations are separate and searchable in the sidebar.

---

**Version:** 1.0
**Status:** Updated for Production
**Last Modified:** 2025-12-04

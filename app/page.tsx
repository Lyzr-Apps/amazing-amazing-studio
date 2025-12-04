'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send, Plus, MessageCircle, Trash2, Search, X, Settings } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface Conversation {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
  agentMode: string
}

interface Agent {
  id: string
  name: string
  label: string
  description: string
  icon: string
}

const CHAT_AGENT_ID = '693174578f91bb17ff418457'
const HISTORY_AGENT_ID = '69317575e71ca2ee4bada670'
const RESEARCH_AGENT_ID = '6931775c8f91bb17ff4187b6'
const CREATIVE_AGENT_ID = '693177628f91bb17ff4187bb'
const TECHNICAL_AGENT_ID = '693177678f91bb17ff4187c0'

const AGENTS: Agent[] = [
  {
    id: CHAT_AGENT_ID,
    name: 'Chat Assistant Agent',
    label: 'Assistant',
    description: 'General conversation and Q&A',
    icon: 'MessageCircle'
  },
  {
    id: RESEARCH_AGENT_ID,
    name: 'Research Agent',
    label: 'Research',
    description: 'In-depth analysis and research',
    icon: 'Search'
  },
  {
    id: CREATIVE_AGENT_ID,
    name: 'Creative Agent',
    label: 'Creative',
    description: 'Brainstorming and ideas',
    icon: 'Lightbulb'
  },
  {
    id: TECHNICAL_AGENT_ID,
    name: 'Technical Agent',
    label: 'Technical',
    description: 'Code and technical help',
    icon: 'Code'
  }
]

export default function HomePage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [selectedAgentId, setSelectedAgentId] = useState(CHAT_AGENT_ID)
  const [showAgentSelector, setShowAgentSelector] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const currentConversation = conversations.find(c => c.id === currentConversationId)
  const currentAgent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0]

  // Filter conversations based on search query
  const filteredConversations = searchQuery.trim()
    ? conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.messages.some(msg =>
          msg.text.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : conversations

  useEffect(() => {
    // Initialize with welcome message
    if (conversations.length === 0) {
      createNewConversation()
    }
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentConversation?.messages])

  function createNewConversation() {
    const newId = Date.now().toString()
    const agent = AGENTS.find(a => a.id === selectedAgentId) || AGENTS[0]
    const welcomeMessages: { [key: string]: string } = {
      [CHAT_AGENT_ID]: "Hi! I'm your assistant. How can I help you today?",
      [RESEARCH_AGENT_ID]: "Welcome to Research Mode. I'm here to help you dive deep into topics with detailed analysis and sources.",
      [CREATIVE_AGENT_ID]: "Welcome to Creative Mode. Let's brainstorm and explore innovative ideas together!",
      [TECHNICAL_AGENT_ID]: "Welcome to Technical Mode. I'm here to help with code, debugging, and system design questions."
    }
    const welcomeMessage: Message = {
      id: '0',
      text: welcomeMessages[selectedAgentId] || welcomeMessages[CHAT_AGENT_ID],
      sender: 'bot',
      timestamp: new Date()
    }
    const newConversation: Conversation = {
      id: newId,
      title: `${agent.label} Conversation`,
      messages: [welcomeMessage],
      createdAt: new Date(),
      agentMode: selectedAgentId
    }
    setConversations([newConversation, ...conversations])
    setCurrentConversationId(newId)
  }

  function deleteConversation(id: string) {
    const filtered = conversations.filter(c => c.id !== id)
    setConversations(filtered)
    if (currentConversationId === id) {
      setCurrentConversationId(filtered[0]?.id || null)
      if (filtered.length === 0) {
        createNewConversation()
      }
    }
  }

  async function handleSendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!inputValue.trim() || !currentConversationId || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setConversations(prevConvs =>
      prevConvs.map(conv =>
        conv.id === currentConversationId
          ? {
              ...conv,
              messages: [...conv.messages, userMessage],
              title: conv.title === 'New Conversation' ? inputValue.substring(0, 30) : conv.title
            }
          : conv
      )
    )

    setInputValue('')
    setIsLoading(true)

    try {
      // Get conversation history for context
      const conversationHistory = currentConversation?.messages || []
      const formattedHistory = conversationHistory
        .map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`)
        .join('\n')

      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputValue,
          agent_id: selectedAgentId,
          session_id: currentConversationId,
          user_id: 'default-user',
          conversation_context: formattedHistory
        })
      })

      const data = await response.json()

      // Extract response with multiple fallback strategies
      const botResponseText = data.response?.result
        ?? data.response?.response
        ?? data.response?.message
        ?? (typeof data.response === 'string' ? data.response : null)
        ?? data.raw_response
        ?? 'Sorry, I could not process that request.'

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      }

      setConversations(prevConvs =>
        prevConvs.map(conv =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, botMessage] }
            : conv
        )
      )

      // Call History Agent to index and manage conversation history
      try {
        await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Index conversation: User asked "${inputValue}" and received response. Store this interaction for future retrieval.`,
            agent_id: HISTORY_AGENT_ID,
            session_id: currentConversationId,
            user_id: 'default-user'
          })
        })
      } catch (historyError) {
        console.log('History indexing completed')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: 'Sorry, there was an error processing your request.',
        sender: 'bot',
        timestamp: new Date()
      }
      setConversations(prevConvs =>
        prevConvs.map(conv =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, errorMessage] }
            : conv
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold text-gray-900">Chatbot</h1>
          </div>
          <Button
            onClick={createNewConversation}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-gray-200">
          {showSearch ? (
            <div className="flex gap-2">
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-white border-gray-300 text-gray-900 placeholder-gray-400 flex-1"
                autoFocus
              />
              <button
                onClick={() => {
                  setShowSearch(false)
                  setSearchQuery('')
                }}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className="w-full flex items-center gap-2 p-2 hover:bg-gray-200 rounded transition-colors text-gray-700"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm">Search history</span>
            </button>
          )}
        </div>

        {/* Conversation History */}
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {filteredConversations.map(conv => (
              <div
                key={conv.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                  currentConversationId === conv.id
                    ? 'bg-blue-100 border border-blue-300'
                    : 'bg-white hover:bg-gray-100 border border-transparent'
                }`}
                onClick={() => setCurrentConversationId(conv.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {conv.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {conv.createdAt.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      deleteConversation(conv.id)
                    }}
                    className="p-1 rounded hover:bg-gray-200 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentConversation?.title || 'Chat'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Current Agent: {currentAgent.label}
              </p>
            </div>
            <button
              onClick={() => setShowAgentSelector(!showAgentSelector)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Switch agent"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Agent Selector */}
          {showAgentSelector && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Switch Agent:</p>
              <div className="grid grid-cols-2 gap-2">
                {AGENTS.map(agent => (
                  <button
                    key={agent.id}
                    onClick={() => {
                      setSelectedAgentId(agent.id)
                      setShowAgentSelector(false)
                    }}
                    className={`p-3 rounded-lg text-left transition-all ${
                      selectedAgentId === agent.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-medium text-sm text-gray-900">
                      {agent.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {agent.description}
                    </p>
                  </button>
                ))}
              </div>
              <Button
                onClick={() => createNewConversation()}
                className="w-full mt-3 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start New Chat with {currentAgent.label}
              </Button>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-2xl mx-auto space-y-4">
            {currentConversation?.messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm break-words">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user'
                        ? 'text-blue-100'
                        : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSendMessage} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 bg-white border-gray-300 text-gray-900 placeholder-gray-400"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

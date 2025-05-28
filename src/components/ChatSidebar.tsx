
import React from 'react';
import { Plus, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { ChatMessage } from '@/pages/Index';

interface ChatSidebarProps {
  chatHistory: ChatMessage[];
  currentChatId: string | null;
  onLoadChat: (chatId: string) => void;
  onNewChat: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const ChatSidebar = ({ 
  chatHistory, 
  currentChatId, 
  onLoadChat, 
  onNewChat,
  isCollapsed,
  onToggleCollapse
}: ChatSidebarProps) => {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`fixed top-0 left-0 h-screen bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out z-10 ${
      isCollapsed ? 'w-12' : 'w-80'
    }`}>
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onToggleCollapse}
            className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-all duration-150"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
        {!isCollapsed && (
          <button
            onClick={onNewChat}
            className="w-full flex items-center space-x-3 bg-white hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-xl border border-gray-200 transition-all duration-150 hover:scale-[1.02] hover:shadow-sm"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        )}
        {isCollapsed && (
          <button
            onClick={onNewChat}
            className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 rounded-lg border border-gray-200 transition-all duration-150 mt-2 mx-auto"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {!isCollapsed && (
          <>
            {chatHistory.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No chats yet</p>
                <p className="text-sm">Start a conversation to see your chat history</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => onLoadChat(chat.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-150 hover:bg-white hover:shadow-sm group ${
                    currentChatId === chat.id
                      ? 'bg-white shadow-sm border border-orange-200'
                      : 'hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(chat.timestamp)}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {chat.model}
                        </span>
                        <span className="text-xs text-gray-400">
                          T: {chat.temperature}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
};

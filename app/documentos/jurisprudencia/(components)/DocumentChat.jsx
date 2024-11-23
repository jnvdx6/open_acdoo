import { useChat } from 'ai/react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Send } from "lucide-react";

export const DocumentChat = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: []
  });

  return (
    <Card className="flex flex-col h-[calc(100vh-400px)] border-0 shadow-none">
      <div className="flex justify-between items-center p-3 border-b border-neutral-200 dark:border-neutral-800">
        <h3 className="font-semibold text-[#2C3E50] dark:text-white">Chat con el documento</h3>
        <Button variant="ghost" size="icon" className="hover:text-[#FF6B35]">
          <MessageSquare className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-[#FF6B35] bg-opacity-10 ml-auto'
                  : 'bg-neutral-100 dark:bg-neutral-800 mr-auto'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 mr-auto max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-[#FF6B35] rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-neutral-200 dark:border-neutral-800 p-4">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Pregunta sobre el documento..."
            className="w-full p-3 pr-12 rounded-lg border border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900
              focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
          />
          <Button 
            type="submit"
            size="icon" 
            className="absolute right-2 top-2 hover:text-[#FF6B35] transition-colors"
            disabled={isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};
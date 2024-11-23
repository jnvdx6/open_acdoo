import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2 } from 'lucide-react';

export default function ChatInput({ onSend }) {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        try {
            setIsLoading(true);
            await onSend(input);
            setInput('');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex space-x-2 w-full p-4 bg-white dark:bg-neutral-900 border-t dark:border-neutral-800 shadow-lg">
            <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Haz una pregunta de seguimiento..."
                className="flex-grow bg-neutral-50 dark:bg-neutral-800 
                    border-neutral-200 dark:border-neutral-700 
                    text-neutral-900 dark:text-neutral-100
                    placeholder:text-neutral-500 dark:placeholder:text-neutral-400
                    focus-visible:ring-2 focus-visible:ring-orange-500 dark:focus-visible:ring-orange-600"
                disabled={isLoading}
            />
            <Button
                onClick={handleSend}
                size="icon"
                className="bg-[#FF6B35] hover:bg-[#ff8555] dark:hover:bg-[#ff8555] transition-colors"
                disabled={isLoading}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                ) : (
                    <Send className="h-4 w-4 text-white" />
                )}
            </Button>
        </div>
    );
}

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, Share2, Trash2 } from 'lucide-react';
import { Message } from '@/components/ChatBubble';
import { useToast } from '@/hooks/use-toast';

type ConversationActionsProps = {
  messages: Message[];
  onClearChat: () => void;
};

const ConversationActions: React.FC<ConversationActionsProps> = ({ 
  messages, 
  onClearChat 
}) => {
  const { toast } = useToast();
  
  const saveConversation = () => {
    if (messages.length === 0) {
      toast({
        title: "Nothing to save",
        description: "Start a conversation first!",
        variant: "destructive",
      });
      return;
    }

    // Format the conversation as text
    const text = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'MindTrack AI'}: ${msg.content}`
    ).join('\n\n');
    
    // Create a blob and download
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindtrack-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversation saved",
      description: "Your chat has been downloaded as a text file.",
    });
  };
  
  const shareConversation = () => {
    if (messages.length === 0) {
      toast({
        title: "Nothing to share",
        description: "Start a conversation first!",
        variant: "destructive",
      });
      return;
    }
    
    // For now, we'll implement a simple "copy to clipboard" share
    const text = messages.map(msg => 
      `${msg.sender === 'user' ? 'You' : 'MindTrack AI'}: ${msg.content}`
    ).join('\n\n');
    
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "Now you can paste and share your conversation.",
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please try again or save the conversation instead.",
        variant: "destructive",
      });
    });
  };

  return (
    <div className="flex space-x-2 mt-4 justify-end">
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs" 
        onClick={saveConversation}
      >
        <Download className="h-3.5 w-3.5 mr-1.5" />
        Save
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs" 
        onClick={shareConversation}
      >
        <Share2 className="h-3.5 w-3.5 mr-1.5" />
        Share
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="text-xs text-destructive hover:text-destructive" 
        onClick={onClearChat}
      >
        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
        Clear
      </Button>
    </div>
  );
};

export default ConversationActions;

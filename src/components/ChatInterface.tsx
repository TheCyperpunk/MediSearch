
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, AlertCircle, ChevronDown, Stethoscope, PlusCircle, FileText, Pill, Clipboard, Activity, Heart, Brain, Thermometer, Loader2, Square, StopCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'audio';
  audioUrl?: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello Doctor, how can I assist you today? You can ask me about patient records, medications, lab results, or medical history.",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate assistant response after a delay
    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('medication') || input.toLowerCase().includes('prescriptions')) {
        response = "Patient John Doe is currently taking Lisinopril 10mg daily for hypertension and Metformin 500mg twice daily for type 2 diabetes. The last prescription was filled on October 15, 2023.";
      } else if (input.toLowerCase().includes('lab') || input.toLowerCase().includes('results')) {
        response = "The most recent lab results for John Doe from October 1, 2023 show: HbA1c: 7.2%, Cholesterol: 185 mg/dL, Blood Pressure: 128/85 mmHg. There's a slight elevation in HbA1c levels compared to previous results.";
      } else if (input.toLowerCase().includes('history') || input.toLowerCase().includes('condition')) {
        response = "John Doe has a history of hypertension (diagnosed 2018), type 2 diabetes (diagnosed 2019), and underwent an appendectomy in 2015. Family history includes cardiovascular disease.";
      } else {
        response = "I understand you're asking about John Doe. Could you please specify what medical information you're looking for? I can provide details about medications, lab results, medical history, or recent visits.";
      }

      // Hide typing indicator
      setIsTyping(false);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      // In a real app, this would stop the actual recording and save the audio data
      // For this demo, we'll simulate having recorded audio
      const simulatedAudioBlob = new Blob([], { type: 'audio/webm' });
      setRecordedAudio(simulatedAudioBlob);
    } else {
      // Start recording
      setRecordedAudio(null);
    }
    setIsRecording(!isRecording);
    // In a real app, this would trigger speech recognition
  };

  const sendRecordedAudio = () => {
    if (!recordedAudio) return;
    
    // Add user message for the audio recording
    const userMessage: Message = {
      id: Date.now().toString(),
      content: "[Audio Message]",
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setRecordedAudio(null);
    
    // Show typing indicator
    setIsTyping(true);

    // Simulate assistant response after a delay
    setTimeout(() => {
      const response = "I've received your audio message. In a real application, this would be processed through speech-to-text and analyzed. How else can I assist you today?";

      // Hide typing indicator
      setIsTyping(false);

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] rounded-lg border bg-card glass-panel overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 relative">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-medical-primary/5 via-transparent to-medical-accent/5 pointer-events-none"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4 bg-gradient-to-r from-medical-primary/10 to-medical-accent/10 backdrop-blur-sm relative z-10">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-medical-primary to-medical-accent flex items-center justify-center text-white shadow-lg">
            <Stethoscope className="h-4 w-4" />
          </div>
          <div className="ml-2">
            <h3 className="font-medium text-gradient">Medical Assistant</h3>
            <p className="text-xs text-muted-foreground">AI-powered medical information retrieval</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-medical-primary/10 transition-colors duration-300" aria-label="New Chat">
            <PlusCircle className="h-4 w-4 text-medical-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-medical-primary/10 transition-colors duration-300" aria-label="Menu">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Quick action buttons */}
      <div className="flex items-center gap-2 p-2 bg-gray-50/50 dark:bg-gray-900/20 overflow-x-auto scrollbar-hide">
        <Button variant="outline" size="sm" className="rounded-full text-xs bg-white/80 hover:bg-medical-primary/10 border-medical-primary/20 hover:border-medical-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap">
          <Pill className="h-3 w-3 text-medical-primary" /> Medications
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs bg-white/80 hover:bg-medical-primary/10 border-medical-primary/20 hover:border-medical-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap">
          <Clipboard className="h-3 w-3 text-medical-primary" /> Lab Results
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs bg-white/80 hover:bg-medical-primary/10 border-medical-primary/20 hover:border-medical-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap">
          <Activity className="h-3 w-3 text-medical-primary" /> Vitals
        </Button>
        <Button variant="outline" size="sm" className="rounded-full text-xs bg-white/80 hover:bg-medical-primary/10 border-medical-primary/20 hover:border-medical-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-1 whitespace-nowrap">
          <Heart className="h-3 w-3 text-medical-primary" /> Conditions
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/10">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex max-w-[80%] animate-slide-up",
              msg.sender === 'user' ? 'ml-auto' : 'mr-auto'
            )}
          >
            {msg.sender === 'assistant' && (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-medical-primary to-medical-accent flex-shrink-0 flex items-center justify-center text-white shadow-md mr-2 mt-1">
                <Brain className="h-4 w-4" />
              </div>
            )}
            <div
              className={cn(
                "rounded-2xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-300",
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-medical-primary to-medical-accent text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700'
              )}
            >
              <div className="space-y-2">
                <p className="text-sm">{msg.content}</p>
                <p className="text-xs opacity-70">
                  {msg.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
              
              {msg.sender === 'assistant' && msg.content.includes('elevation') && (
                <div className="flex items-center mt-2 p-2 bg-destructive/10 text-destructive rounded animate-pulse-slow">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <span className="text-xs">Attention: Elevated values detected</span>
                </div>
              )}
            </div>
            {msg.sender === 'user' && (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white shadow-md ml-2 mt-1">
                <div className="text-xs font-medium">DR</div>
              </div>
            )}
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex max-w-[80%] mr-auto animate-fade-in">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-medical-primary to-medical-accent flex-shrink-0 flex items-center justify-center text-white shadow-md mr-2 mt-1">
              <Brain className="h-4 w-4" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-medical-primary animate-bounce"></div>
                <div className="h-2 w-2 rounded-full bg-medical-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 rounded-full bg-medical-primary animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md relative z-10">
        <div className="flex items-center space-x-2">
          <textarea
            className="flex-1 bg-background border border-input rounded-lg resize-none p-3 focus:outline-none focus:ring-2 focus:ring-medical-primary transition-all duration-300 shadow-inner"
            placeholder="Ask about patient's medical information..."
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
          {recordedAudio ? (
            <Button 
              size="icon" 
              variant="outline" 
              onClick={sendRecordedAudio}
              className="rounded-full bg-medical-primary text-white hover:bg-medical-accent transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          ) : (
            <Button 
              size="icon" 
              variant="outline" 
              onClick={toggleRecording}
              className={cn(
                "rounded-full hover:bg-medical-primary/10 transition-all duration-300", 
                isRecording ? "bg-destructive text-destructive-foreground animate-pulse" : "border-medical-primary/20 hover:border-medical-primary"
              )}
            >
              {isRecording ? <StopCircle className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <Button 
            onClick={handleSend} 
            disabled={!input.trim()}
            className="bg-gradient-to-r from-medical-primary to-medical-accent hover:from-medical-accent hover:to-medical-primary text-white shadow-lg hover:shadow-xl hover:shadow-medical-accent/30 transition-all duration-300 transform hover:scale-105 rounded-full"
          >
            <Send className="h-4 w-4 mr-1" />
            Send
          </Button>
        </div>
        
        {/* Recording indicator */}
        {isRecording && (
          <div className="mt-3 flex items-center justify-center animate-fade-in">
            <div className="relative flex items-center justify-center">
              {/* Pulsing circles */}
              <div className="absolute h-12 w-12 rounded-full bg-destructive/20 animate-ping"></div>
              <div className="absolute h-10 w-10 rounded-full bg-destructive/30 animate-ping" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute h-8 w-8 rounded-full bg-destructive/40 animate-ping" style={{ animationDelay: '0.4s' }}></div>
              
              {/* Center recording icon */}
              <div className="relative h-6 w-6 rounded-full bg-destructive flex items-center justify-center shadow-lg z-10">
                <Mic className="h-3 w-3 text-white" />
              </div>
            </div>
            
            {/* Recording text and timer */}
            <div className="ml-3 flex flex-col">
              <div className="flex items-center">
                <span className="text-xs font-medium text-destructive mr-2">Recording</span>
                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse"></div>
              </div>
              <div className="text-xs text-muted-foreground">Speak now... Click stop when finished</div>
            </div>
            
            {/* Audio waveform visualization */}
            <div className="ml-auto flex items-center space-x-0.5">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="h-4 w-1 bg-destructive/70 rounded-full animate-bounce" 
                  style={{ 
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${i * 0.1}s`,
                    height: `${8 + Math.random() * 8}px`
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Recorded audio ready to send */}
        {recordedAudio && !isRecording && (
          <div className="mt-3 flex items-center justify-between bg-medical-primary/10 rounded-lg p-2 animate-fade-in">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-medical-primary/20 flex items-center justify-center">
                <FileText className="h-4 w-4 text-medical-primary" />
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium">Audio recording ready</p>
                <p className="text-xs text-muted-foreground">Click send to transmit</p>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={sendRecordedAudio}
              className="bg-gradient-to-r from-medical-primary to-medical-accent text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <Send className="h-3 w-3 mr-1" /> Send Audio
            </Button>
          </div>
        )}
        
        {/* Health metrics summary */}
        <div className="mt-2 pt-2 border-t border-gray-200/30 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Thermometer className="h-3 w-3 mr-1 text-medical-primary" />
            <span>Patient Vitals: Normal</span>
          </div>
          <div className="flex items-center">
            <FileText className="h-3 w-3 mr-1 text-medical-primary" />
            <span>5 Records Available</span>
          </div>
          <div className="flex items-center">
            <Activity className="h-3 w-3 mr-1 text-medical-primary" />
            <span>Last Updated: Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

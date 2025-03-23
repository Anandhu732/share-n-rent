
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

interface ConnectionStatusProps {
  className?: string;
}

const DjangoConnectionStatus = ({ className }: ConnectionStatusProps) => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const { toast } = useToast();
  const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try to connect to your Django backend's health check endpoint
        await axios.get(`${apiUrl}/health-check/`);
        setStatus('connected');
        toast({
          title: "Connected to Django Backend",
          description: "Successfully connected to your Django database.",
        });
      } catch (error) {
        console.error("Failed to connect to Django backend:", error);
        setStatus('disconnected');
        toast({
          title: "Connection Failed",
          description: "Could not connect to Django backend. Check your API configuration.",
          variant: "destructive",
        });
      }
    };

    checkConnection();
  }, [apiUrl, toast]);

  return (
    <div className={className}>
      <Badge 
        variant={status === 'connected' ? "success" : status === 'checking' ? "outline" : "destructive"}
        className="animate-in fade-in duration-300"
      >
        {status === 'connected' 
          ? 'Connected to Django' 
          : status === 'checking' 
            ? 'Checking connection...' 
            : 'Disconnected from Django'}
      </Badge>
    </div>
  );
};

export default DjangoConnectionStatus;

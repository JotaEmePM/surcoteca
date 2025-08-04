'use client';

import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import { useAuth } from '../lib/use-auth';
import { useState } from 'react';

interface SocialButtonsProps {
  onError?: (error: string) => void;
  className?: string;
}

export default function SocialButtons({ onError, className = '' }: SocialButtonsProps) {
  const { signInWithProvider } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState<string | null>(null);

  const handleProviderLogin = async (provider: 'github' | 'google') => {
    setIsSigningIn(provider);
    
    const { error } = await signInWithProvider(provider);
    
    if (error) {
      const errorMessage = `Error al iniciar sesión con ${provider === 'github' ? 'GitHub' : 'Google'}. Inténtalo de nuevo.`;
      onError?.(errorMessage);
      setIsSigningIn(null);
    }
  };

  return (
    <div className={`flex gap-3 ${className}`}>
      <button
        type="button"
        onClick={() => handleProviderLogin('github')}
        disabled={isSigningIn === 'github'}
        className="flex-1 py-2 border border-muted text-foreground rounded-md flex items-center justify-center gap-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <IconBrandGithub className="h-5 w-5" />
        {isSigningIn === 'github' ? 'Conectando...' : 'GitHub'}
      </button>
      
      <button
        type="button"
        onClick={() => handleProviderLogin('google')}
        disabled={isSigningIn === 'google'}
        className="flex-1 py-2 border border-muted text-foreground rounded-md flex items-center justify-center gap-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <IconBrandGoogle className="h-5 w-5" />
        {isSigningIn === 'google' ? 'Conectando...' : 'Google'}
      </button>
    </div>
  );
}

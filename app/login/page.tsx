'use client';

import { IconBrandGithub, IconBrandGoogle, IconPasswordFingerprint } from '@tabler/icons-react';
import { useAuth } from '../lib/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';

function LoginForm() {
  const { signInWithGitHub, signInWithGoogle, signInWithProvider, user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSigningIn, setIsSigningIn] = useState<string | null>(null); // Cambio: trackear qué provider está loading
  const [error, setError] = useState<string | null>(null);

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Mostrar error si viene de la URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'auth_error') {
      setError('Hubo un problema con la autenticación. Inténtalo de nuevo.');
    } else if (errorParam === 'config_error') {
      setError('La aplicación no está configurada correctamente. Contacta al administrador.');
    }
  }, [searchParams]);

  const handleGitHubLogin = async () => {
    setIsSigningIn('github');
    setError(null);
    
    const { error } = await signInWithGitHub();
    
    if (error) {
      setError('Error al iniciar sesión con GitHub. Inténtalo de nuevo.');
      setIsSigningIn(null);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSigningIn('google');
    setError(null);
    
    const { error } = await signInWithGoogle();
    
    if (error) {
      setError('Error al iniciar sesión con Google. Inténtalo de nuevo.');
      setIsSigningIn(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <>
      
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-secondary rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">

            <IconPasswordFingerprint className="h-8 w-8 text-primary" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Title */}
          <h2 className="text-center text-foreground text-2xl font-bold mb-6">
            Accede a tu cuenta
          </h2>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-muted-foreground text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-muted-foreground text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-primary"
                />
                <span className="ml-2">Recordarme</span>
              </label>
              <a href="#" className="text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-primary hover:bg-primary-hover text-primary-foreground font-semibold"
            >
              Acceder
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-muted"></div>
            <span className="mx-4 text-muted-foreground text-sm">O continuar con</span>
            <div className="flex-grow border-t border-muted"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGitHubLogin}
              disabled={isSigningIn === 'github'}
              className="flex-1 py-2 border border-muted text-foreground rounded-md flex items-center justify-center gap-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconBrandGithub className="h-5 w-5" />
              {isSigningIn === 'github' ? 'Conectando...' : 'GitHub'}
            </button>
            
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSigningIn === 'google'}
              className="flex-1 py-2 border border-muted text-foreground rounded-md flex items-center justify-center gap-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconBrandGoogle className="h-5 w-5" />
              {isSigningIn === 'google' ? 'Conectando...' : 'Google'}
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            ¿Aún no te registras?{' '}
            <a href="#" className="text-primary hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-foreground">Cargando página de login...</div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
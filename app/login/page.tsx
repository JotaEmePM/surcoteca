import { IconBrandGithub, IconPasswordFingerprint } from '@tabler/icons-react';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-secondary rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">

            <IconPasswordFingerprint className="h-8 w-8 text-primary" />
          </div>

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
          <div className="flex gap-4">
            
            <button
              type="button"
              className="flex-1 py-2 border border-muted text-foreground rounded-md flex items-center justify-center gap-2 hover:bg-muted"
            >
              <IconBrandGithub className="h-5 w-5" />
              GitHub
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
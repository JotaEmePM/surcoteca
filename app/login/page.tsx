import { IconBrandGithub, IconPasswordFingerprint } from '@tabler/icons-react';
import Head from 'next/head';

export default function Login() {
  return (
    <>
      
      <div className="min-h-screen bg-[#161d1c] flex items-center justify-center">
        <div className="bg-[#1f2a29] rounded-2xl shadow-lg p-8 w-full max-w-md mx-4">
          {/* Logo */}
          <div className="flex justify-center mb-6">

            <IconPasswordFingerprint className="h-8 w-8 text-indigo-500" />
          </div>

          {/* Title */}
          <h2 className="text-center text-white text-2xl font-bold mb-6">
            Accede a tu cuenta
          </h2>

          {/* Form */}
          <form className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-md bg-[#2e3b39] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-md bg-[#2e3b39] text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-300">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-indigo-500"
                />
                <span className="ml-2">Recordarme</span>
              </label>
              <a href="#" className="text-indigo-400 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-[#93c8bd] hover:bg-[#7fb5ac] text-[#0e1918] hover:text-[#0e1918] font-semibold"
            >
              Acceder
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="mx-4 text-gray-400 text-sm">O continuar con</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            
            <button
              type="button"
              className="flex-1 py-2 border border-gray-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-gray-700"
            >
              <IconBrandGithub className="h-5 w-5" />
              GitHub
            </button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            ¿Aún no te registras?{' '}
            <a href="#" className="text-indigo-400 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
// app/completar-info/page.tsx
'use client'

export default function Complete() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-[#161d1c] p-4">
      <div className="w-full max-w-md bg-[#1f2a29] rounded-2xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-white text-center">Completa tu información de registro</h1>

        <form className="space-y-4">
          {/* RUT */}
          <div>
            <label htmlFor="rut" className="block text-sm text-white mb-1">RUT</label>
            <input
              id="rut"
              name="rut"
              type="text"
              placeholder="12.345.678-9"
              className="w-full px-4 py-2 rounded-md bg-[#2a3c3a] text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-[#93c8bd]"
            />
          </div>

          {/* Checkbox publicidad */}
          <div className="flex items-center space-x-2">
            <input
              id="publicidad"
              name="publicidad"
              type="checkbox"
              className="h-4 w-4 text-[#93c8bd] bg-[#2a3c3a] border-gray-300 rounded"
            />
            <label htmlFor="publicidad" className="text-sm text-white">
              Deseo recibir información de publicidad
            </label>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-[#93c8bd] hover:bg-[#7eb2a8] text-[#1f2a29] hover:text-white font-medium py-2 rounded-md transition-colors duration-200"
          >
            Guardar información
          </button>
        </form>
      </div>
    </main>
  )
}
export function getRandomItem<T>(arr: T[]): T | undefined {
  if (arr.length === 0)
    return undefined

  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}

/**
 * Hook para obtener la URL base de la aplicación
 * Funciona tanto en desarrollo como en producción
 */
export const useBaseUrl = () => {
  // En el cliente, usar window.location.origin
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // En el servidor, usar la variable de entorno o fallback
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  console.log('1.Base URL en el servidor:', siteUrl || 'http://localhost:3001')
  return siteUrl || 'http://localhost:3001'
}

/**
 * Función para obtener la URL base (funciona en server y client)
 */
export const getBaseUrl = () => {
  // En el cliente
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  // En el servidor
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  console.log('2.Base URL en el servidor:', siteUrl || 'http://localhost:3002')

  return siteUrl || 'http://localhost:3002'
}
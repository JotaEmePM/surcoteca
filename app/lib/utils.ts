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
    return window.location.origin;
  }
  
  // En el servidor, usar la variable de entorno o fallback
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};

/**
 * Función para obtener la URL base (funciona en server y client)
 */
export const getBaseUrl = () => {
  // En el cliente
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // En el servidor
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
};
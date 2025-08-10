// app/(lib)/sidebar/SidebarContext.tsx
'use client'

import React, {
  createContext,
  JSX,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'

/** --- Tipos de dominio --- **/
export type SidebarState = {
  /** Abierto/cerrado del panel */
  isOpen: boolean
  /** Modo colapsado (iconos) */
  isCollapsed: boolean
  /** Item activo por route o id */
  activeItem: string | null
  /** Ancho actual del sidebar en px */
  width: number
}

/** Acciones del reducer (exhaustivas) */
export type SidebarAction =
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'TOGGLE' }
  | { type: 'SET_COLLAPSED'; payload: { isCollapsed: boolean } }
  | { type: 'SET_ACTIVE_ITEM'; payload: { activeItem: string | null } }
  | { type: 'SET_WIDTH'; payload: { width: number } }
  | { type: 'RESET'; payload?: Partial<SidebarState> }

/** Valor que expone el Context */
export type SidebarContextValue = {
  state: SidebarState
  dispatch: Dispatch<SidebarAction>
  // Helpers tipados (opcionales, por ergonomía)
  open: () => void
  close: () => void
  toggle: () => void
  setCollapsed: (isCollapsed: boolean) => void
  setActiveItem: (activeItem: string | null) => void
  setWidth: (width: number) => void
}

/** Estado inicial por defecto */
export const defaultSidebarState: SidebarState = {
  isOpen: true,
  isCollapsed: false,
  activeItem: null,
  width: 280,
}

/** Reducer puro, 100% tipeado */
export function sidebarReducer(state: SidebarState, action: SidebarAction): SidebarState {
  switch (action.type) {
    case 'OPEN':
      return { ...state, isOpen: true, isCollapsed: false }
    case 'CLOSE':
      return { ...state, isOpen: false }
    case 'TOGGLE':
      return { ...state, isOpen: !state.isOpen, isCollapsed: state.isOpen ? state.isCollapsed : state.isCollapsed }
    case 'SET_COLLAPSED':
      return { ...state, isCollapsed: action.payload.isCollapsed, isOpen: action.payload.isCollapsed ? true : state.isOpen }
    case 'SET_ACTIVE_ITEM':
      return { ...state, activeItem: action.payload.activeItem }
    case 'SET_WIDTH':
      return { ...state, width: Math.max(160, action.payload.width) }
    case 'RESET':
      return { ...defaultSidebarState, ...action.payload }
    default: {
      // Garantiza exhaustividad en tiempo de compilación
      const _exhaustive: never = action
      return state
    }
  }
}

/** Clave para persistencia en localStorage */
const STORAGE_KEY: string = 'app.sidebar.v1'

/** Context real */
const SidebarContext = createContext<SidebarContextValue | null>(null)

/** Props del Provider */
export type SidebarProviderProps = {
  children: ReactNode
  /** Sobrescribir estado inicial (opcional) */
  initialState?: Partial<SidebarState>
  /** Persistir en localStorage (default: true) */
  persist?: boolean
}

export function SidebarProvider(props: SidebarProviderProps): JSX.Element {
  const { children, initialState, persist = true } = props

  // Estado inicial (hidrata desde localStorage si procede)
  const getInitialState = (): SidebarState => {
    if (typeof window !== 'undefined' && persist) {
      try {
        const raw: string | null = window.localStorage.getItem(STORAGE_KEY)
        if (raw) {
          const parsed: unknown = JSON.parse(raw)
          // Narrowing simple: valida propiedades esperadas
          if (
            typeof parsed === 'object' &&
            parsed !== null &&
            'isOpen' in parsed &&
            'isCollapsed' in parsed &&
            'activeItem' in parsed &&
            'width' in parsed
          ) {
            const p = parsed as SidebarState
            return { ...defaultSidebarState, ...p, ...initialState }
          }
        }
      } catch {
        // ignora errores de parseo
      }
    }
    return { ...defaultSidebarState, ...initialState }
  }

  const [state, dispatch] = useReducer(sidebarReducer, undefined as unknown as SidebarState, getInitialState)

  // Persistencia
  useEffect((): void => {
    if (!persist) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // almacenamiento puede fallar (modo privado, etc.)
    }
  }, [state, persist])

  // Helpers tipados
  const value: SidebarContextValue = useMemo(() => {
    const open = (): void => dispatch({ type: 'OPEN' })
    const close = (): void => dispatch({ type: 'CLOSE' })
    const toggle = (): void => dispatch({ type: 'TOGGLE' })
    const setCollapsed = (isCollapsed: boolean): void =>
      dispatch({ type: 'SET_COLLAPSED', payload: { isCollapsed } })
    const setActiveItem = (activeItem: string | null): void =>
      dispatch({ type: 'SET_ACTIVE_ITEM', payload: { activeItem } })
    const setWidth = (width: number): void =>
      dispatch({ type: 'SET_WIDTH', payload: { width } })

    return { state, dispatch, open, close, toggle, setCollapsed, setActiveItem, setWidth }
  }, [state])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

/** Hook seguro y tipeado */
export function useSidebar(): SidebarContextValue {
  const ctx = useContext(SidebarContext)
  if (!ctx) {
    throw new Error('useSidebar must be used within a <SidebarProvider>.')
  }
  return ctx
}

type AdminSidebarProvidersProps = {
  children: ReactNode;
  sidebarInitialState?: SidebarProviderProps['initialState'];
};

export default function AdminSidebarProviders(props: AdminSidebarProvidersProps): JSX.Element {
  const { children, sidebarInitialState } = props
  return (
    <SidebarProvider initialState={sidebarInitialState} persist>
      {children}
    </SidebarProvider>
  )
}
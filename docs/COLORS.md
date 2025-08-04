# Guía de Colores Surcoteca

## Variables de Color Disponibles

### Colores Principales
- `bg-primary` / `text-primary` - `#93c8bd` - Color principal de la marca
- `bg-primary-hover` / `text-primary-hover` - `#7fb5ac` - Variante hover del color principal
- `text-primary-foreground` - `#0e1918` - Texto sobre el color principal

### Colores de Fondo
- `bg-background` - `#161d1c` - Fondo principal de la aplicación
- `bg-secondary` - `#1f2a29` - Fondo secundario (cards, modales)
- `bg-muted` - `#2e3b39` - Fondo para inputs y elementos deshabilitados

### Colores de Texto
- `text-foreground` - `#ffffff` - Texto principal
- `text-secondary-foreground` - `#ffffff` - Texto sobre fondo secundario
- `text-muted-foreground` - `#d1d5db` - Texto secundario/deshabilitado

### Colores de Acento
- `bg-accent` / `text-accent` - `#93c8bd` - Color de acento (igual al principal)
- `bg-accent-hover` / `text-accent-hover` - `#7fb5ac` - Variante hover del acento
- `text-accent-foreground` - `#0e1918` - Texto sobre color de acento

### Colores de Interacción
- `bg-card-hover` - `#243530` - Fondo hover para cards y elementos interactivos

## Ejemplos de Uso

### Botones
```tsx
// Botón principal
<button className="bg-primary hover:bg-primary-hover text-primary-foreground">
  Botón Principal
</button>

// Botón secundario
<button className="bg-secondary hover:bg-muted text-secondary-foreground">
  Botón Secundario
</button>
```

### Cards/Modales
```tsx
<div className="bg-secondary rounded-lg p-6">
  <h2 className="text-secondary-foreground">Título</h2>
  <p className="text-muted-foreground">Descripción</p>
</div>
```

### Cards con Hover
```tsx
<div className="bg-transparent hover:bg-card-hover rounded-lg p-4 transition-all duration-200">
  <h3 className="text-foreground">Producto</h3>
  <p className="text-primary">$29.99</p>
</div>
```

### Inputs
```tsx
<input 
  className="bg-muted text-foreground placeholder:text-primary focus:ring-primary"
  placeholder="Buscar..."
/>
```

### Links y Acentos
```tsx
<a href="#" className="text-primary hover:text-primary-hover">
  Enlace
</a>
```

## Ventajas del Sistema

✅ **Consistencia**: Todos los colores están centralizados  
✅ **Mantenibilidad**: Cambiar un color actualiza toda la aplicación  
✅ **Theming**: Fácil implementación de temas claros/oscuros  
✅ **Accesibilidad**: Contraste calculado y consistente  
✅ **Escalabilidad**: Fácil agregar nuevos colores al sistema  

## Migración de Colores Antiguos

| Color Hardcodeado | Nueva Variable |
|------------------|----------------|
| `#93c8bd` | `primary` |
| `#7fb5ac` | `primary-hover` |
| `#161d1c` | `background` |
| `#1f2a29` | `secondary` |
| `#2e3b39` | `muted` |
| `#ffffff` | `foreground` |
| `#0e1918` | `primary-foreground` |
| `#244740` | `card-hover` |

## Próximos Pasos

1. Buscar archivos con colores hardcodeados: `#93c8bd`, `#161d1c`, etc.
2. Reemplazar con las nuevas variables de Tailwind
3. Probar en diferentes dispositivos y navegadores
4. Considerar agregar variantes para estados (disabled, loading, etc.)

#!/usr/bin/env node

/**
 * Script de prueba para el sistema de correos
 * Uso: node test-email.js
 */

// Test data para el usuario
const testUser = {
    id: 'test_user_123',
    email: 'perezmjosem@gmail.com', // Cambia esto por tu email real
    user_metadata: {
        name: 'Usuario de Prueba',
        full_name: 'Usuario de Prueba Completo',
        avatar_url: 'https://github.com/ghost.png',
        provider: 'github'
    },
    created_at: new Date().toISOString(),
    last_sign_in_at: new Date().toISOString()
}

async function testWelcomeEmail() {
    try {
        console.log('🧪 Probando envío de correo de bienvenida...')

        const response = await fetch('http://localhost:3000/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'welcome',
                user: testUser
            })
        })

        const result = await response.json()

        if (response.ok) {
            console.log('✅ Correo de bienvenida enviado exitosamente!')
            console.log('📧 ID del correo:', result.data?.id)
        } else {
            console.error('❌ Error enviando correo:', result.error)
        }
    } catch (error) {
        console.error('❌ Error en la prueba:', error.message)
    }
}

async function testCustomEmail() {
    try {
        console.log('🧪 Probando envío de correo personalizado...')

        const response = await fetch('http://localhost:3000/api/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'custom',
                to: testUser.email,
                subject: '🧪 Prueba de correo personalizado',
                html: `
          <h1>¡Hola desde Surcoteca!</h1>
          <p>Este es un correo de prueba del sistema personalizado.</p>
          <p>Si recibes este correo, ¡todo está funcionando correctamente! 🎉</p>
          <hr>
          <small>Enviado desde el script de prueba</small>
        `,
                text: 'Hola! Este es un correo de prueba del sistema personalizado.',
                tags: [
                    { name: 'category', value: 'test' },
                    { name: 'environment', value: 'development' }
                ]
            })
        })

        const result = await response.json()

        if (response.ok) {
            console.log('✅ Correo personalizado enviado exitosamente!')
            console.log('📧 ID del correo:', result.data?.id)
        } else {
            console.error('❌ Error enviando correo:', result.error)
        }
    } catch (error) {
        console.error('❌ Error en la prueba:', error.message)
    }
}

async function main() {
    console.log('🚀 Iniciando pruebas del sistema de correos...\n')

    // Verificar que el servidor esté corriendo
    try {
        await fetch('http://localhost:3000/api/email')
    } catch (error) {
        console.error('❌ El servidor no está corriendo en localhost:3000')
        console.log('💡 Ejecuta: pnpm dev')
        process.exit(1)
    }

    await testWelcomeEmail()
    console.log('')
    await testCustomEmail()

    console.log('\n🎯 Pruebas completadas!')
    console.log('📱 Revisa tu bandeja de entrada para ver los correos.')
}

main().catch(console.error)

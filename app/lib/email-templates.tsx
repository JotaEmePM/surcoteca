import React from 'react'
import {
    Html,
    Head,
    Body,
    Container,
    Section,
    Text,
    Heading,
    Hr,
    Link,
} from '@react-email/components'

interface WelcomeEmailProps {
    userName: string
    userEmail: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName, userEmail }) => (
    <Html>
        <Head />
        <Body style={main}>
            <Container style={container}>
                {/* Header */}
                <Section style={header}>
                    <Heading style={h1}>¡Bienvenido a Surcoteca! 🎉</Heading>
                </Section>

                {/* Content */}
                <Section style={content}>
                    <Text style={text}>Hola <strong>{userName}</strong>,</Text>

                    <Text style={text}>
                        ¡Gracias por unirte a Surcoteca! Estamos emocionados de tenerte como parte de nuestra comunidad.
                    </Text>

                    <Text style={text}>
                        Tu cuenta ha sido creada exitosamente con el email: <strong>{userEmail}</strong>
                    </Text>

                    <Section style={infoBox}>
                        <Heading as="h3" style={h3}>¿Qué puedes hacer ahora?</Heading>
                        <Text style={listText}>
                            • Explora nuestro catálogo de productos<br />
                            • Configura tu perfil personal<br />
                            • Mantente al día con las últimas ofertas<br />
                            • Conecta con otros miembros de la comunidad
                        </Text>
                    </Section>

                    <Text style={text}>
                        Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
                        Estamos aquí para ayudarte.
                    </Text>

                    <Text style={text}>¡Disfruta tu experiencia en Surcoteca!</Text>

                    <Text style={signature}>
                        Saludos,<br />
                        <strong>El equipo de Surcoteca</strong>
                    </Text>
                </Section>

                {/* Footer */}
                <Hr style={hr} />
                <Section style={footer}>
                    <Text style={footerText}>
                        © 2025 Surcoteca. Todos los derechos reservados.
                    </Text>
                    <Text style={footerText}>
                        Este correo fue enviado a {userEmail}
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

// Estilos
const main = {
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
}

const container = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '20px',
}

const header = {
    textAlign: 'center' as const,
    marginBottom: '30px',
}

const h1 = {
    color: '#333333',
    fontSize: '28px',
    margin: 0,
}

const h3 = {
    color: '#333333',
    margin: '0 0 10px 0',
    fontSize: '18px',
}

const content = {
    color: '#555555',
    fontSize: '16px',
    lineHeight: '1.6',
}

const text = {
    margin: '0 0 16px 0',
}

const listText = {
    margin: '0',
    lineHeight: '1.8',
}

const infoBox = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0',
    borderLeft: '4px solid #007bff',
}

const signature = {
    marginBottom: '30px',
    marginTop: '20px',
}

const hr = {
    borderColor: '#eeeeee',
    margin: '20px 0',
}

const footer = {
    textAlign: 'center' as const,
    fontSize: '14px',
    color: '#888888',
}

const footerText = {
    margin: '5px 0',
}

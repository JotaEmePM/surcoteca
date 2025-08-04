import { NextRequest, NextResponse } from 'next/server'
import { sendWelcomeEmail, sendEmail } from '@/app/lib/email-service'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, ...data } = body

        switch (type) {
            case 'welcome': {
                const { user } = data
                if (!user || !user.email) {
                    return NextResponse.json(
                        { error: 'User data with email is required' },
                        { status: 400 }
                    )
                }

                const result = await sendWelcomeEmail(user)

                if (result.success) {
                    return NextResponse.json({
                        success: true,
                        message: 'Welcome email sent successfully',
                        data: result.data
                    })
                } else {
                    return NextResponse.json(
                        { error: result.error },
                        { status: 500 }
                    )
                }
            }

            case 'custom': {
                const { to, subject, html, text, tags } = data

                if (!to || !subject) {
                    return NextResponse.json(
                        { error: 'To and subject are required' },
                        { status: 400 }
                    )
                }

                const result = await sendEmail({ to, subject, html, text, tags })

                if (result.success) {
                    return NextResponse.json({
                        success: true,
                        message: 'Email sent successfully',
                        data: result.data
                    })
                } else {
                    return NextResponse.json(
                        { error: result.error },
                        { status: 500 }
                    )
                }
            }

            default:
                return NextResponse.json(
                    { error: 'Invalid email type. Supported types: welcome, custom' },
                    { status: 400 }
                )
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

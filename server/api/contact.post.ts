import { Resend } from 'resend'

interface ContactBody {
  name: string
  email: string
  company?: string
  message: string
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody<ContactBody>(event)

  // Validate
  if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
    throw createError({ statusCode: 400, statusMessage: 'Name, email, and message are required.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email address.' })
  }

  if (!config.resendApiKey) {
    // In development without a key, just log and return success
    console.info('[contact] No RESEND_API_KEY set — logging message instead:')
    console.info({ ...body })
    return { success: true }
  }

  const resend = new Resend(config.resendApiKey)
  const toEmail = config.contactToEmail || 'hello@powerlinelabs.com'

  const { error } = await resend.emails.send({
    from: 'Powerline Labs Contact <noreply@powerlinelabs.com>',
    to: toEmail,
    replyTo: body.email,
    subject: `New enquiry from ${body.name}${body.company ? ` (${body.company})` : ''}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
      ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
      <hr>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${body.message}</p>
    `,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    throw createError({ statusCode: 500, statusMessage: 'Failed to send message. Please try again.' })
  }

  return { success: true }
})

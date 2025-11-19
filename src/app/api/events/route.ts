import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .eq('is_active', true)
      .order('event_date', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error in events API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data: event, error } = await supabase
      .from('events')
      .insert([{
        title_en: body.title_en,
        title_ar: body.title_ar,
        description_en: body.description_en,
        description_ar: body.description_ar,
        event_date: body.event_date,
        location_en: body.location_en,
        location_ar: body.location_ar,
        event_type: body.event_type || 'tournament',
        registration_url: body.registration_url,
        image_url: body.image_url,
        is_active: body.is_active !== false,
        is_featured: body.is_featured || false,
        max_participants: body.max_participants,
        registration_deadline: body.registration_deadline,
        order_index: body.order_index || 0
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating event:', error)
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    // Send notification email to subscribers
    try {
      await sendEventNotification(event.id, 'created')
    } catch (emailError) {
      console.error('Error sending notification email:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error in events POST API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function sendEventNotification(eventId: string, type: 'created' | 'updated' | 'cancelled') {
  try {
    // Get event details
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('*')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      throw new Error('Event not found')
    }

    // Get active subscribers
    const { data: subscribers, error: subError } = await supabase
      .from('email_subscriptions')
      .select('email, name, preferences')
      .eq('is_active', true)

    if (subError || !subscribers || subscribers.length === 0) {
      console.log('No active subscribers found')
      return
    }

    // Filter subscribers who want event notifications
    interface Subscriber {
      email: string
      name?: string
      preferences?: {
        events?: boolean
      }
    }
    const eventSubscribers = (subscribers as Subscriber[]).filter((sub: Subscriber) => 
      sub.preferences?.events !== false
    )

    if (eventSubscribers.length === 0) {
      console.log('No subscribers interested in event notifications')
      return
    }

    // Send emails (in a real implementation, you'd use an email service like SendGrid, Resend, etc.)
    console.log(`Sending ${type} notification for event "${event.title_en}" to ${eventSubscribers.length} subscribers`)
    
    // Log the notification
    await supabase
      .from('event_notifications')
      .insert([{
        event_id: eventId,
        notification_type: type,
        recipients_count: eventSubscribers.length,
        status: 'sent'
      }])

    // In a real implementation, you would:
    // 1. Use an email service like Resend, SendGrid, or AWS SES
    // 2. Create email templates
    // 3. Send personalized emails to each subscriber
    // 4. Handle bounces and unsubscribes
    
  } catch (error) {
    console.error('Error sending event notification:', error)
    throw error
  }
}

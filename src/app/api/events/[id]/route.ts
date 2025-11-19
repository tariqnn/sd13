import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface Subscriber {
  email: string
  name?: string
  preferences?: {
    events?: boolean
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const { data: event, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching event:', error)
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error in event GET API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Get the original event to check if it was updated
    const { data: originalEvent } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    const { data: event, error } = await supabase
      .from('events')
      .update({
        title_en: body.title_en,
        title_ar: body.title_ar,
        description_en: body.description_en,
        description_ar: body.description_ar,
        event_date: body.event_date,
        location_en: body.location_en,
        location_ar: body.location_ar,
        event_type: body.event_type,
        registration_url: body.registration_url,
        image_url: body.image_url,
        is_active: body.is_active,
        is_featured: body.is_featured,
        max_participants: body.max_participants,
        registration_deadline: body.registration_deadline,
        order_index: body.order_index,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating event:', error)
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }

    // Send notification email if significant changes were made
    if (originalEvent && (
      originalEvent.title_en !== body.title_en ||
      originalEvent.event_date !== body.event_date ||
      originalEvent.location_en !== body.location_en ||
      originalEvent.is_active !== body.is_active
    )) {
      try {
        await sendEventNotification(id, 'updated')
      } catch (emailError) {
        console.error('Error sending update notification:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error in event PUT API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Send cancellation notification before deleting
    try {
      await sendEventNotification(id, 'cancelled')
    } catch (emailError) {
      console.error('Error sending cancellation notification:', emailError)
      // Continue with deletion even if notification fails
    }

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting event:', error)
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error in event DELETE API:', error)
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
    const typedSubscribers: Subscriber[] = subscribers as Subscriber[]
    const eventSubscribers = typedSubscribers.filter((sub: Subscriber) => 
      sub.preferences?.events !== false
    )

    if (eventSubscribers.length === 0) {
      console.log('No subscribers interested in event notifications')
      return
    }

    // Send emails (in a real implementation, you'd use an email service)
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

  } catch (error) {
    console.error('Error sending event notification:', error)
    throw error
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, preferences } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Check if email already exists
    const { data: existingSub, error: checkError } = await supabase
      .from('email_subscriptions')
      .select('*')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing subscription:', checkError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (existingSub) {
      if (existingSub.is_active) {
        return NextResponse.json({ 
          message: 'Email already subscribed',
          alreadySubscribed: true 
        })
      } else {
        // Reactivate subscription
        const { data: reactivatedSub, error: reactivateError } = await supabase
          .from('email_subscriptions')
          .update({
            is_active: true,
            name: name || existingSub.name,
            preferences: preferences || existingSub.preferences,
            unsubscribed_at: null
          })
          .eq('email', email)
          .select()
          .single()

        if (reactivateError) {
          console.error('Error reactivating subscription:', reactivateError)
          return NextResponse.json({ error: 'Failed to reactivate subscription' }, { status: 500 })
        }

        return NextResponse.json({ 
          message: 'Subscription reactivated successfully',
          subscription: reactivatedSub 
        })
      }
    }

    // Create new subscription
    const { data: subscription, error: insertError } = await supabase
      .from('email_subscriptions')
      .insert([{
        email,
        name: name || null,
        preferences: preferences || { events: true, news: true, promotions: true },
        is_active: true
      }])
      .select()
      .single()

    if (insertError) {
      console.error('Error creating subscription:', insertError)
      return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Successfully subscribed to updates',
      subscription 
    })
  } catch (error) {
    console.error('Error in subscribe API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('email_subscriptions')
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email)

    if (error) {
      console.error('Error unsubscribing:', error)
      return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Successfully unsubscribed' })
  } catch (error) {
    console.error('Error in unsubscribe API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

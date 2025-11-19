'use client'

import EmailSubscription from './EmailSubscription'

export default function Newsletter() {
  return (
    <section className="py-20 bg-[#F8F7F2]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <EmailSubscription />
        </div>
      </div>
    </section>
  )
}
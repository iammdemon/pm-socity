'use client';

import React from 'react';
import { Mail, Calendar } from 'lucide-react';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto md:my-20 my-16">
          {/* Header Section */}
          <div className="border border-gray-200 dark:border-gray-700 mb-8 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    Terms of Service
                  </h1>
                  <p className="mt-1 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Last Updated: September 15, 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                Welcome to <strong className="text-gray-900 dark:text-white">The PM Society, Inc.</strong> (&quot;Company,&quot;
                &quot;we,&quot; &quot;our,&quot; &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your
                access to and use of our website, services, training programs,
                memberships, coaching, and any other offerings provided by The
                PM Society (collectively, the &quot;Services&quot;). By using our
                Services, you agree to be bound by these Terms.
              </p>
            </div>
          </div>

          {/* Terms Content */}
          <div className="overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Section 1: Eligibility */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      1. Eligibility
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      You must be at least 18 years old to use our Services. By
                      accessing or using our Services, you represent that you
                      meet this requirement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: Accounts & Membership */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      2. Accounts & Membership
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      To access certain Services, you may need to create an
                      account or register as a member. You are responsible for
                      keeping your login information secure and for all
                      activities that occur under your account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Payments & Refunds */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      3. Payments & Refunds
                    </h2>
                    <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0"></div>
                        <span>
                          All fees are clearly listed at the time of purchase.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0"></div>
                        <span>
                          Payments are processed securely through third-party
                          providers (e.g., Stripe, PayPal).
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0"></div>
                        <span>
                          Refunds are only available in accordance with our
                          published refund policy below.
                        </span>
                      </li>
                    </ul>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2">
                      Refund Policy
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      All purchases with The PM Society, Inc. are final and non-refundable. This applies to courses, memberships, mentorship and coaching sessions, events, and all other services. Because our programs provide immediate access to digital resources, live training, and exclusive benefits, refunds are not available once a purchase is made. If you are unable to attend a scheduled session or event, we may be able to reschedule you for a future program or event if availability allows. Please note that refunds will not be issued under any circumstances. Enrollment or purchase confirms your acceptance of this policy. For questions, please contact us at{' '}
                      <a
                        href="mailto:contact@thepmsociety.com"
                        className="text-gray-900 dark:text-white hover:underline"
                      >
                        contact@thepmsociety.com
                      </a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4: Dispute Resolution */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      4. Dispute Resolution
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      At The PM Society, Inc., we aim to resolve all concerns quickly and fairly. If you have a dispute regarding your purchase, please contact us at{' '}
                      <a
                        href="mailto:contact@thepmsociety.com"
                        className="text-gray-900 dark:text-white hover:underline"
                      >
                        contact@thepmsociety.com
                      </a>{' '}
                      so we can work toward a resolution. If a resolution cannot be reached directly, you agree that any dispute will be resolved through binding arbitration under the laws of the State of Texas. By purchasing from The PM Society, you waive the right to pursue claims in court or through class actions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 5: Acceptable Use */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      5. Acceptable Use
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                      You agree not to misuse our Services. This includes, but
                      is not limited to:
                    </p>
                    <ul className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0"></div>
                        <span>
                          Sharing course materials without permission.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0"></div>
                        <span>Using the Services for unlawful purposes.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white mt-2 shrink-0"></div>
                        <span>
                          Attempting to disrupt, hack, or harm our website or
                          community.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 6: Intellectual Property */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      6. Intellectual Property
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      All materials, including training content, course guides,
                      graphics, and logos, are owned by The PM Society or its
                      licensors. You may not copy, distribute, or resell our
                      content without prior written consent.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 7: Disclaimers & Limitation of Liability */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      7. Disclaimers & Limitation of Liability
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Our Services are provided &quot;as is&quot; without warranties of
                      any kind. To the fullest extent permitted by law, The PM
                      Society is not liable for any damages arising out of your
                      use or inability to use our Services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 8: Termination */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      8. Termination
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      We reserve the right to suspend or terminate your account
                      if you violate these Terms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 9: Governing Law */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      9. Governing Law
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      These Terms shall be governed by and construed under the
                      laws of the <strong className="text-gray-900 dark:text-white">State of Texas</strong>, without regard to
                      conflict of law provisions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 10: Contact Us */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      10. Contact Us
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      If you have questions about these Terms, please contact us
                      at:
                    </p>
                    <a
                      href="mailto:contact@thepmsociety.com"
                      className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg transition-colors font-medium hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                      <Mail className="w-4 h-4" />
                      contact@thepmsociety.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
import Head from "next/head";
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - The PM Society</title>
        <meta name="description" content="Privacy Policy for The PM Society, Inc." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <header className="md:mt-20 mt-16 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Last Updated: August 19, 2025</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 sm:p-8 mb-8">
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              At The PM Society, Inc. (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; &quot;us&quot;), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share your information when you use our website and Services.
            </p>
          </div>

          <div className="space-y-8">
            {/* Section 1: Information We Collect */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We may collect:</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Personal information (name, email, phone number, billing information).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Account details (username, password).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Technical information (cookies, IP address, browser type).</span>
                </li>
              </ul>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We use your information to:</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Provide and improve our Services.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Process payments and manage memberships.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Communicate with you about updates, events, and promotions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Comply with legal obligations.</span>
                </li>
              </ul>
            </section>

            {/* Section 3: Sharing & Disclosure */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Sharing & Disclosure</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We do not sell your personal information. We may share it with:</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Payment processors (e.g., Stripe, PayPal).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Email marketing tools (e.g., Mailchimp, Lemlist).</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Service providers who support our operations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white mt-2 shrink-0"></div>
                  <span>Legal authorities if required by law.</span>
                </li>
              </ul>
            </section>

            {/* Section 4: Data Security */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement reasonable security measures to protect your information. However, no system is completely secure, and we cannot guarantee 100% protection.
              </p>
            </section>

            {/* Section 5: Cookies & Tracking */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Cookies & Tracking</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use cookies and similar technologies to improve user experience and track site performance. You may disable cookies in your browser settings.
              </p>
            </section>

            {/* Section 6: Your Rights */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                You may request access to, correction of, or deletion of your personal information by contacting us. You can also opt out of marketing emails at any time.
              </p>
            </section>

            {/* Section 7: Children's Privacy */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Children&apos;s Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our Services are not intended for children under 13. We do not knowingly collect information from children under 13.
              </p>
            </section>

            {/* Section 8: Changes to This Policy */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised Last Updated date.
              </p>
            </section>

            {/* Section 9: Contact Us */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">9. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, please contact us at:{' '}
                <a
                  href="mailto:contact@thepmsociety.com"
                  className="text-gray-900 dark:text-white hover:underline font-medium"
                >
                  contact@thepmsociety.com
                </a>
              </p>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
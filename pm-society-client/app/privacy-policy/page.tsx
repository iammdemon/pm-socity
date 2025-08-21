import Head from "next/head";
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';

export default function PrivacyPolicy() {
  return (
    <> 
    <div className="min-h-screen py-8">
      <Head> 
        <title>Privacy Policy - The PM Society</title>
        <meta name="description" content="Privacy Policy for The PM Society, Inc." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
<Header />
      <header className=" md:mt-20 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-lg">Last Updated: August 19, 2025</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="mb-8">
          <p className="text-gray-700 mb-4">
            At The PM Society, Inc. (“Company,” “we,” “our,” “us”), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and share your information when you use our website and Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700">We may collect:</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Personal information (name, email, phone number, billing information).</li>
            <li>Account details (username, password).</li>
            <li>Technical information (cookies, IP address, browser type).</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700">We use your information to:</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Provide and improve our Services.</li>
            <li>Process payments and manage memberships.</li>
            <li>Communicate with you about updates, events, and promotions.</li>
            <li>Comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Sharing & Disclosure</h2>
          <p className="text-gray-700">We do not sell your personal information. We may share it with:</p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Payment processors (e.g., Stripe, PayPal).</li>
            <li>Email marketing tools (e.g., Mailchimp, Lemlist).</li>
            <li>Service providers who support our operations.</li>
            <li>Legal authorities if required by law.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
          <p className="text-gray-700">
            We implement reasonable security measures to protect your information. However, no system is completely secure, and we cannot guarantee 100% protection.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies & Tracking</h2>
          <p className="text-gray-700">
            We use cookies and similar technologies to improve user experience and track site performance. You may disable cookies in your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
          <p className="text-gray-700">
            You may request access to, correction of, or deletion of your personal information by contacting us. You can also opt out of marketing emails at any time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Children’s Privacy</h2>
          <p className="text-gray-700">
            Our Services are not intended for children under 13. We do not knowingly collect information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last Updated” date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Us</h2>
          <p className="text-gray-700">
            If you have questions about this Privacy Policy, please contact us at:{' '}
            <a href="mailto:contact@thepmsociety.com" className="text-black hover:underline">
              contact@thepmsociety.com
            </a>
          </p>
        </section>
      </main>

   
    </div>
    <Footer/>
    </>
  );
}
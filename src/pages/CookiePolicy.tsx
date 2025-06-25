
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export default function CookiePolicy() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Container className="flex-1 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
          
          <div className="prose dark:prose-invert prose-headings:mb-3 prose-headings:mt-6 prose-p:mb-4 max-w-none">
            <p className="text-lg mb-8 text-muted-foreground">
              Last updated: May 1, 2025
            </p>

            <h2>1. What are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit certain websites. They are widely used to make websites work more efficiently and provide information to the website owners.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly and cannot be switched off. They are usually set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.</li>
              <li><strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
              <li><strong>Analytical Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</li>
              <li><strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for individual users.</li>
            </ul>

            <h2>3. Types of Cookies We Use</h2>
            <p><strong>First-Party Cookies:</strong> Cookies that are set by SkinSewa.</p>
            <p><strong>Third-Party Cookies:</strong> Cookies that are set by our partners and service providers, such as Google Analytics, to help us understand how visitors interact with our website.</p>
            
            <h2>4. Specific Cookies We Use</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Cookie Name</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Purpose</th>
                    <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">_session_id</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Maintains user session state</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Session</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">_skinSewa_auth</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Authentication token</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">30 days</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">_ga</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Google Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">_gid</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Google Analytics</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">24 hours</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">theme</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Stores user theme preference (light/dark)</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">language</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">Stores user language preference</td>
                    <td className="border border-gray-300 dark:border-gray-700 p-2">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>5. Managing Your Cookie Preferences</h2>
            <p>
              Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. Generally, you can also configure your browser settings to notify you when you receive a cookie.
            </p>
            <p>
              You can manage your cookie preferences by using the following links for popular browsers:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-skinsewa-blue hover:underline">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-skinsewa-blue hover:underline">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" className="text-skinsewa-blue hover:underline">Safari</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-skinsewa-blue hover:underline">Microsoft Edge</a></li>
            </ul>
            <p>
              Please note that if you choose to disable cookies, you may not be able to use all features of our website.
            </p>

            <h2>6. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date.
            </p>

            <h2>7. Contact Us</h2>
            <p>
              If you have questions about our Cookie Policy, please contact us at:
            </p>
            <p>
              Email: privacy@skinsewa.com<br />
              Address: 123 Dermatology Lane, New Delhi, India 110001
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

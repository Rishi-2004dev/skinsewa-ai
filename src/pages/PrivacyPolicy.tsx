
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export default function PrivacyPolicy() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Container className="flex-1 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert prose-headings:mb-3 prose-headings:mt-6 prose-p:mb-4 max-w-none">
            <p className="text-lg mb-8 text-muted-foreground">
              Last updated: May 1, 2025
            </p>

            <h2>1. Introduction</h2>
            <p>
              SkinSewa ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services, including our AI-powered skin analysis tools.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Personal Information:</strong> Name, email address, phone number, age, and other demographic information you provide during registration or assessment.</li>
              <li><strong>Health Information:</strong> Skin conditions, symptoms, medical history, and other health-related information you share for analysis.</li>
              <li><strong>Images:</strong> Photos of skin conditions you upload for analysis.</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and other technical information about your device.</li>
              <li><strong>Usage Data:</strong> Information about how you use our services, including clickstream data and interaction with features.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide and improve our skin analysis services</li>
              <li>Generate personalized reports and recommendations</li>
              <li>Train and improve our AI algorithms</li>
              <li>Communicate with you about our services</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Ensure the security of our platform</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2>5. Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Healthcare Providers:</strong> With your consent, we may share your data with dermatologists or other healthcare providers for consultation purposes.</li>
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in providing our services, such as cloud storage providers and analytics services.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information as required by law or in response to valid legal requests.</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Restrict or object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
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

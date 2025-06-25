
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Container className="flex-1 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert prose-headings:mb-3 prose-headings:mt-6 prose-p:mb-4 max-w-none">
            <p className="text-lg mb-8 text-muted-foreground">
              Last updated: May 1, 2025
            </p>

            <h2>1. Introduction</h2>
            <p>
              These Terms of Service ("Terms") govern your use of SkinSewa's website, mobile application, and services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use our Services.
            </p>

            <h2>2. Not a Substitute for Medical Advice</h2>
            <p>
              <strong>IMPORTANT:</strong> SkinSewa provides AI-powered skin analysis tools that are intended for informational and educational purposes only. Our Services are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions regarding your health condition.
            </p>
            <p>
              The analysis, recommendations, and information provided by our Services are based on artificial intelligence algorithms and should be considered as guidance only. Decisions regarding your healthcare should always be made in consultation with qualified medical professionals.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of our Services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information and to update this information as necessary.
            </p>

            <h2>4. User Content</h2>
            <p>
              Our Services allow you to upload, submit, and share content, including images of skin conditions. By uploading or submitting content, you grant us a non-exclusive, worldwide, royalty-free license to use, store, display, and process your content for the purpose of providing our Services.
            </p>
            <p>
              You represent and warrant that you have all rights necessary to grant us the license above and that your content does not violate any third-party rights or applicable laws.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Use our Services for any illegal purpose or in violation of any laws</li>
              <li>Impersonate any person or entity or falsely state or misrepresent your affiliation</li>
              <li>Engage in any activity that interferes with or disrupts our Services</li>
              <li>Attempt to gain unauthorized access to our Services or systems</li>
              <li>Upload or transmit viruses, malware, or other malicious code</li>
              <li>Collect or harvest information about other users without their consent</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
              The Services, including all content, features, and functionality, are owned by SkinSewa and are protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent.
            </p>

            <h2>7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Services at any time and for any reason, including if we believe you have violated these Terms.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL SKINSEWA, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We may modify these Terms at any time. If we make material changes, we will notify you by email or by posting a notice on our website. Your continued use of the Services after such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of India without regard to its conflict of law principles. Any disputes arising under these Terms shall be resolved exclusively in the courts of New Delhi, India.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@skinsewa.com<br />
              Address: 123 Dermatology Lane, New Delhi, India 110001
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

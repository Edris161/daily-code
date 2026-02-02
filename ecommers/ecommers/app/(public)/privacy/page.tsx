import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Privacy Policy - Alibaba',
  description: 'Read our privacy policy to understand how we protect your data',
};

export default function PrivacyPage() {
  return (
    <div className="container-responsive py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

        <Card className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              Alibaba ("we" or "us" or "our") operates the Alibaba website. This page informs you of
              our policies regarding the collection, use, and disclosure of personal data when you use
              our service and the choices you have associated with that data.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information Collection and Use</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We collect several different types of information for various purposes to provide and improve
              our service to you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Personal data (such as email address, name, phone number, etc.)</li>
              <li>Usage data (such as pages visited, time spent on pages, etc.)</li>
              <li>Cookies and similar tracking technologies</li>
              <li>Device information (IP address, browser type, operating system)</li>
              <li>Transaction information</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Use of Data</h2>
            <p className="text-text-secondary leading-relaxed">
              Alibaba uses the collected data for various purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mt-2">
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To allow you to participate in interactive features of our service</li>
              <li>To provide customer care and support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Security of Data</h2>
            <p className="text-text-secondary leading-relaxed">
              The security of your data is important to us, but remember that no method of transmission
              over the Internet or method of electronic storage is 100% secure. While we strive to use
              commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookies</h2>
            <p className="text-text-secondary leading-relaxed">
              We use cookies to track activity on our website and hold certain information. You can instruct
              your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you
              do not accept cookies, you may not be able to use some portions of our service.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-text-secondary leading-relaxed">
              Our website may contain links to other sites operated by third parties. This Privacy Policy
              does not apply to third-party websites, and we are not responsible for their privacy practices.
              We encourage you to review the privacy policies of any third-party sites before providing your information.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Rights</h2>
            <p className="text-text-secondary leading-relaxed">
              You have the right to access, update, or delete your personal information at any time by logging
              into your account or by contacting us. We will respond to any access request within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at privacy@alibaba.com.
            </p>
          </div>

          <div>
            <p className="text-sm text-text-tertiary">
              Last updated: January 2025
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

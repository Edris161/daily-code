import { Card } from '@/components/ui/Card';

export const metadata = {
  title: 'Terms & Conditions - Alibaba',
  description: 'Read our terms and conditions for using Alibaba platform',
};

export default function TermsPage() {
  return (
    <div className="container-responsive py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms & Conditions</h1>

        <Card className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              These Terms and Conditions govern your use of the Alibaba platform. By accessing and
              using this website, you accept and agree to be bound by the terms and provision of
              this agreement.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials (information
              or software) on Alibaba for personal, non-commercial transitory viewing only. This is
              the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on Alibaba</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on
                any other server</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-text-secondary leading-relaxed">
              The materials on Alibaba are provided on an 'as is' basis. Alibaba makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitations</h2>
            <p className="text-text-secondary leading-relaxed">
              In no event shall Alibaba or its suppliers be liable for any damages (including, without
              limitation, damages for loss of data or profit, or due to business interruption) arising
              out of the use or inability to use the materials on Alibaba.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p className="text-text-secondary leading-relaxed">
              The materials appearing on Alibaba could include technical, typographical, or
              photographic errors. Alibaba does not warrant that any of the materials on its website
              are accurate, complete, or current.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Links</h2>
            <p className="text-text-secondary leading-relaxed">
              Alibaba has not reviewed all of the sites linked to its website and is not responsible
              for the contents of any such linked site. The inclusion of any link does not imply
              endorsement by Alibaba of the site. Use of any such linked website is at the user's own risk.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Modifications</h2>
            <p className="text-text-secondary leading-relaxed">
              Alibaba may revise these terms and conditions for its website at any time without notice.
              By using this website, you are agreeing to be bound by the then current version of these
              terms and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Governing Law</h2>
            <p className="text-text-secondary leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of
              the jurisdiction where Alibaba operates, and you irrevocably submit to the exclusive
              jurisdiction of the courts in that location.
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

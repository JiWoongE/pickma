import { BrandSection } from './BrandSection';
import { FooterGroup } from './FooterGroup';
import { SocialLinks } from './SocialLinks';
import { SupportSection } from './SupportSection';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-14 pt-10 pb-20">
        {/* TOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Brand */}
          <div className="border-gray-200 border-b pb-6 lg:col-span-3 lg:border-r lg:pb-0 lg:pr-6 lg:border-b-0">
            <BrandSection />
          </div>

          {/* Center Nav Group */}
          <FooterGroup />

          {/* Support */}
          <div className="lg:col-span-2">
            <SupportSection />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-200 mt-10 pt-6 text-sm text-gray-500">
          <small>© 2026 PickMa. All rights reserved.</small>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

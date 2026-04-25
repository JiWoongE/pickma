import { MailIcon, MessageCircleMoreIcon, PhoneCall } from 'lucide-react';

export function SupportSection() {
  return (
    <section aria-label="고객센터 정보">
      <h3 className="font-semibold mb-6">고객센터</h3>

      <address className="not-italic text-xs text-gray-600 font-medium">
        <div className="space-y-4">
          <p className="text-primary-600 flex gap-3 font-semibold text-base items-center lg:gap-2">
            <PhoneCall size={20} />
            1588-0000
          </p>
          <p>평일 09:00 - 18:00 (주말/공휴일 휴무)</p>
        </div>
        <div className="mt-2 pt-2 space-y-6 border-t border-transparent lg:mt-4 lg:pt-4 lg:border-gray-200 lg:space-y-4">
          <p className="flex gap-2 items-center">
            <MailIcon size={16} />
            support@example.com
          </p>
          <p className="flex gap-2 items-center">
            <MessageCircleMoreIcon size={16} />
            {/* TODO: 1:1 문의하기 기능 결정 */}
            <button>1:1 문의하기</button>
          </p>
        </div>
      </address>
    </section>
  );
}

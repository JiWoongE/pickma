import Link from 'next/link';

type FooterLink = {
  label: string;
  href: string;
};

type FooterNavSection = {
  title: string;
  items: FooterLink[];
};

const footerNavSections: FooterNavSection[] = [
  {
    title: '서비스',
    items: [
      { label: '내 예약', href: '/bookings' },
      { label: '주문/픽업 관리', href: '/orders' },
      { label: '찜한 상품', href: '/wishlist' },
      { label: '리뷰 관리', href: '/reviews' },
    ],
  },
  {
    title: '파트너',
    items: [
      { label: '가게 등록', href: '/partner/register' },
      { label: '파트너 가이드', href: '/partner/guide' },
      { label: '정산 안내', href: '/partner/payout' },
      { label: '공지사항', href: '/notice' },
    ],
  },
  {
    title: '회사',
    items: [
      { label: '회사 소개', href: '/about' },
      { label: '이용약관', href: '/terms' },
      { label: '개인정보처리방침', href: '/privacy' },
      { label: '위치기반서비스', href: '/location-policy' },
    ],
  },
];

export function FooterGroup() {
  return (
    <div className="py-10 lg:px-10 lg:py-0 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
      {footerNavSections.map((section) => (
        <nav key={section.title} aria-labelledby={`footer-${section.title}`}>
          <h3 id={`footer-${section.title}`} className="font-semibold mb-6">
            {section.title}
          </h3>
          <ul className="space-y-6 lg:space-y-2 text-sm text-gray-500 font-medium">
            {section.items.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-gray-800">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}

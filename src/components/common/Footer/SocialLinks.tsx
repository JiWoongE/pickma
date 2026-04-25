import { SiFacebook, SiInstagram, SiKakaotalk } from 'react-icons/si';

// TODO: 각 소셜 미디어 URL 확정 시 href 교체
const SOCIAL_LINKS = [
  { href: '#', label: '인스타그램', Icon: SiInstagram },
  { href: '#', label: '페이스북', Icon: SiFacebook },
  { href: '#', label: '카카오톡', Icon: SiKakaotalk },
];

export function SocialLinks() {
  return (
    <nav aria-label="소셜 미디어">
      <ul className="flex gap-4">
        {SOCIAL_LINKS.map(({ href, label, Icon }) => (
          <li key={label}>
            {href === '#' ? (
              <span className="inline-flex cursor-not-allowed items-center justify-center rounded-full border border-gray-200 p-2 text-gray-400 opacity-50">
                <span aria-hidden="true">
                  <Icon size={12} />
                </span>
                <span className="sr-only">{label} (준비중)</span>
              </span>
            ) : (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-800"
              >
                <span aria-hidden="true">
                  <Icon size={12} />
                </span>
                <span className="sr-only">{label}</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

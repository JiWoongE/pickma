import Image from 'next/image';

import Logo from '../Logo/Logo';

export function BrandSection() {
  return (
    <section aria-label="브랜드 정보" className="flex flex-col">
      <Logo size="md" />

      <p className="mt-6 text-xs text-gray-600">
        동네 맛집부터 취향저격 상품까지, <br />
        픽마에서 간편하게 픽업하세요.
      </p>

      <div className="mt-12 flex items-center gap-2">
        {/* TODO: 실제 Store 링크 */}
        <a href="#" aria-label="Google Play에서 다운로드">
          <Image
            src="/images/badges/google.svg"
            alt=""
            width={135}
            height={40}
          />
        </a>
        {/* TODO: 실제 Store 링크 */}
        <a href="#" aria-label="App Store에서 다운로드">
          <Image
            src="/images/badges/apple.svg"
            alt=""
            width={120}
            height={40}
          />
        </a>
      </div>
    </section>
  );
}

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  webpack(config) {
    // 기존 svg 처리 rule 찾기
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    );

    // svg 처리 방식 재정의
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      }
    );

    // 기존 rule에서 svg 제외
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

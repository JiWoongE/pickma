export type User = {
  id: string;
  name: string;
  email: string;
  provider: 'google' | 'kakao';
  role: 'customer' | 'seller' | 'admin';
  profileImageUrl?: string;
};

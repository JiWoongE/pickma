import type { Meta, StoryObj } from '@storybook/react-vite';

import { Header } from './Header';

function SearchInput() {
  return <input type="search" placeholder="상품 검색" />;
}

const meta = {
  title: 'common/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    role: { control: 'select', options: ['customer', 'seller', 'admin'] },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Customer: Story = {
  args: { user: '홍길동', role: 'customer', slot: <SearchInput /> },
};

export const Seller: Story = {
  args: { user: '가게사장', role: 'seller' },
};

export const Admin: Story = {
  args: { user: '관리자', role: 'admin' },
};

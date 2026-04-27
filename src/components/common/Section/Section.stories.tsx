import type { Meta, StoryObj } from '@storybook/react-vite';

import { Section } from './Section';

const meta = {
  title: 'common/Section',
  component: Section,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['plain', 'card'] },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  args: {
    variant: 'plain',
    children: '섹션 콘텐츠가 들어갑니다.',
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
    children: '카드 스타일 섹션 콘텐츠가 들어갑니다.',
  },
};

export const WithCustomClassName: Story = {
  args: {
    variant: 'card',
    className: 'bg-gray-50',
    children: '커스텀 클래스가 적용된 섹션입니다.',
  },
};

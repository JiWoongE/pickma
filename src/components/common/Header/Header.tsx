'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import LogoIcon from '@/assets/logo.svg?react';
import { User } from '@/types/types';

type MenuItem =
  | {
      label: string;
      type: 'link';
      href: string;
      className?: string;
    }
  | {
      label: string;
      type: 'action';
      onClick: () => void;
      className?: string;
    };

interface HeaderProps {
  user: User | null;
  menuItems?: MenuItem[];
  slot?: React.ReactNode;
}

export default function Header({ user, menuItems, slot }: HeaderProps) {
  return (
    <header className="w-full flex flex-row justify-between items-center px-12 py-4 border-b border-gray-200">
      <Logo />
      {slot}
      <RightSection user={user} menuItems={menuItems} />
    </header>
  );
}

function Logo() {
  return (
    <div className="flex flex-row items-end gap-2">
      <LogoIcon className="w-12 h-12" />
      <h1 className="text-primary-600 font-bold text-3xl">픽마</h1>
    </div>
  );
}

function RightSection({ user, menuItems }: Omit<HeaderProps, 'slot'>) {
  if (user) {
    return (
      <div className="relative">
        <UserMenu user={user} menuItems={menuItems || []} />
      </div>
    );
  } else {
    return <GuestMenu menuItems={menuItems || []} />;
  }
}

function GuestMenu({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <div className="flex space-x-4">
      {menuItems.map((item, index) => {
        if (item.type === 'action') {
          // TODO: 버튼 컴포넌트를 공용 컴포넌트로 교체
          return (
            <button
              key={index}
              className={`px-4 py-2 text-primary-500 rounded hover:bg-primary-50 transition ${item.className || ''}`}
              onClick={() => {
                item.onClick();
              }}
            >
              {item.label}
            </button>
          );
        } else if (item.type === 'link') {
          return (
            <a
              key={index}
              href={item.href}
              className={`px-4 py-2 text-primary-500 rounded hover:bg-primary-50 transition ${item.className || ''}`}
            >
              {item.label}
            </a>
          );
        }
      })}
    </div>
  );
}

function UserMenu({ user, menuItems }: { user: User; menuItems: MenuItem[] }) {
  if (menuItems.length === 0) {
    return (
      <span className="px-4 py-2 flex items-center gap-2">
        <ProfileAvatar user={user} />
        {user.name}님
      </span>
    );
  }

  return (
    <Menu>
      <MenuButton className="px-4 py-2 flex items-center gap-2 group focus:outline-none">
        <ProfileAvatar user={user} />
        {user.name}님
        <ChevronDownIcon className="w-4 h-4 group-data-open:hidden" />
        <ChevronUpIcon className="w-4 h-4 hidden group-data-open:block" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg focus:outline-none">
        {menuItems.map((item, index) =>
          item.type === 'link' ? (
            <MenuItem
              key={index}
              as={Link}
              href={item.href}
              className={`block px-4 py-2 hover:bg-gray-100 ${item.className || ''}`}
            >
              {item.label}
            </MenuItem>
          ) : (
            <MenuItem
              key={index}
              as="button"
              onClick={item.onClick}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${item.className || ''}`}
            >
              {item.label}
            </MenuItem>
          )
        )}
      </MenuItems>
    </Menu>
  );
}

function ProfileAvatar({ user }: { user: User }) {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-100 mr-2 flex items-center justify-center">
      {user.profileImageUrl ? (
        <Image
          src={user.profileImageUrl}
          alt="프로필 이미지"
          className="w-full h-full object-cover"
        />
      ) : (
        <UserIcon className="w-6 h-6 text-primary-500" strokeWidth={1.5} />
      )}
    </div>
  );
}

'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { User } from '@/types/user';

import { Button } from '../Button/Button';
import Logo from '../Logo/Logo';

type HeaderMenuItem =
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
  menuItems?: HeaderMenuItem[];
  slot?: React.ReactNode;
}

export function Header({ user, menuItems, slot }: HeaderProps) {
  return (
    <header className="w-full flex flex-row justify-between items-center px-12 py-4 border-b border-gray-200">
      <Logo />
      {slot}
      <RightSection user={user} menuItems={menuItems} />
    </header>
  );
}

function RightSection({ user, menuItems }: Omit<HeaderProps, 'slot'>) {
  if (user) {
    return <UserMenu user={user} menuItems={menuItems || []} />;
  } else {
    return <GuestMenu menuItems={menuItems || []} />;
  }
}

function GuestMenu({ menuItems }: { menuItems: HeaderMenuItem[] }) {
  return (
    <div className="flex space-x-1">
      {menuItems.map((item) =>
        item.type === 'action' ? (
          <Button
            key={item.label}
            className={`px-4 py-2 text-primary-500 rounded hover:bg-primary-50 transition ${item.className || ''}`}
            onClick={item.onClick}
          >
            {item.label}
          </Button>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className={`px-4 py-2 text-primary-500 rounded hover:bg-primary-50 transition ${item.className || ''}`}
          >
            {item.label}
          </Link>
        )
      )}
    </div>
  );
}

function UserMenu({
  user,
  menuItems,
}: {
  user: User;
  menuItems: HeaderMenuItem[];
}) {
  if (menuItems.length === 0) {
    return (
      <span className="px-4 py-2 flex items-center gap-2">
        <ProfileAvatar user={user} />
        {user.name}님
      </span>
    );
  }

  return (
    <div className="relative">
      <Menu>
        <MenuButton className="px-4 py-2 flex items-center gap-2 group rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
          <ProfileAvatar user={user} />
          {user.name}님
          <ChevronDownIcon className="w-4 h-4 group-data-active:hidden" />
          <ChevronUpIcon className="w-4 h-4 hidden group-data-active:block" />
        </MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg focus:outline-none">
          {menuItems.map((item) =>
            item.type === 'link' ? (
              <MenuItem
                key={item.label}
                as={Link}
                href={item.href}
                className={`block px-4 py-2 hover:bg-gray-100 data-focus:bg-gray-100 ${item.className || ''}`}
              >
                {item.label}
              </MenuItem>
            ) : (
              <MenuItem
                key={item.label}
                as="button"
                type="button"
                onClick={item.onClick}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 data-focus:bg-gray-100 ${item.className || ''}`}
              >
                {item.label}
              </MenuItem>
            )
          )}
        </MenuItems>
      </Menu>
    </div>
  );
}

function ProfileAvatar({ user }: { user: User }) {
  return (
    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-primary-100 flex items-center justify-center">
      {user.profileImageUrl ? (
        <Image
          src={user.profileImageUrl}
          alt=""
          fill
          sizes="32px"
          className="object-cover"
        />
      ) : (
        <UserIcon className="w-6 h-6 text-primary-500" strokeWidth={1.5} />
      )}
    </div>
  );
}

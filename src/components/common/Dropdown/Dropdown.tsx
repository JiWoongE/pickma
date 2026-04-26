'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '../Button/Button';

type SelectDropdownItem = {
  label: string;
  value: string;
  disabled?: boolean;
};

type ActionDropdownItem = {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type ButtonVariant = 'filled' | 'outline' | 'ghost';

interface BaseDropdownProps {
  buttonVariant?: ButtonVariant;
  disabled?: boolean;
}

interface SelectDropdownProps extends BaseDropdownProps {
  type: 'select';
  placeholder?: string;
  items: SelectDropdownItem[];
  value?: string;
  onChange: (value: string) => void;
}

interface ActionDropdownProps extends BaseDropdownProps {
  type: 'action';
  placeholder: string;
  items: ActionDropdownItem[];
}

type DropdownProps = SelectDropdownProps | ActionDropdownProps;

export function Dropdown(props: DropdownProps) {
  const buttonLabel =
    props.type === 'select'
      ? (props.items.find((item) => item.value === props.value)?.label ??
        props.placeholder ??
        '선택')
      : props.placeholder;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        as={Button}
        variant={props.buttonVariant ?? 'outline'}
        color="gray"
        disabled={props.disabled}
      >
        <span className="inline-flex items-center gap-2">
          {buttonLabel}
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </MenuButton>

      <MenuItems className="absolute left-0 z-10 mt-2 w-44 rounded-md border border-gray-200 bg-white p-1 shadow-lg focus:outline-none">
        {props.type === 'select'
          ? props.items.map((item) => {
              const isSelected = item.value === props.value;
              const handleSelectItemClick = () => {
                if (item.disabled) return;
                props.onChange(item.value);
              };

              return (
                <MenuItem key={item.value} disabled={item.disabled}>
                  {({ focus }) => (
                    <button
                      type="button"
                      disabled={item.disabled}
                      onClick={handleSelectItemClick}
                      className={[
                        'block w-full rounded px-3 py-2 text-left text-sm',
                        focus ? 'bg-gray-100' : '',
                        isSelected
                          ? 'font-semibold text-gray-900'
                          : 'text-gray-700',
                        item.disabled ? 'cursor-not-allowed opacity-50' : '',
                      ].join(' ')}
                    >
                      {item.label}
                    </button>
                  )}
                </MenuItem>
              );
            })
          : props.items.map((item) => {
              const handleActionItemClick = () => {
                if (item.disabled) return;

                item.onClick();
              };

              return (
                <MenuItem key={item.id} disabled={item.disabled}>
                  {({ focus }) => (
                    <button
                      type="button"
                      disabled={item.disabled}
                      onClick={handleActionItemClick}
                      className={[
                        'block w-full rounded px-3 py-2 text-left text-sm text-gray-700',
                        focus ? 'bg-gray-100' : '',
                        item.disabled ? 'cursor-not-allowed opacity-50' : '',
                      ].join(' ')}
                    >
                      {item.label}
                    </button>
                  )}
                </MenuItem>
              );
            })}
      </MenuItems>
    </Menu>
  );
}

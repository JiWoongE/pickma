'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';

interface SelectDropdownItem {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ActionDropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface BaseDropdownProps {
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
        disabled={props.disabled}
        className="headlessui-focus-visible:outline-none headlessui-focus-visible:ring-2 headlessui-focus-visible:ring-offset-2 inline-flex items-center justify-center gap-2 rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        <span>{buttonLabel}</span>
        <ChevronDownIcon
          aria-hidden="true"
          focusable="false"
          className="h-4 w-4"
        />
      </MenuButton>

      <MenuItems className="absolute left-0 z-10 mt-2 w-44 rounded-md border border-gray-200 bg-white p-1 shadow-lg focus:outline-none">
        {props.type === 'select'
          ? props.items.map((item) => {
              const isSelected = item.value === props.value;

              const handleSelectItemClick = () => {
                props.onChange(item.value);
              };

              return (
                <MenuItem key={item.value} disabled={item.disabled}>
                  <button
                    type="button"
                    disabled={item.disabled}
                    aria-selected={isSelected}
                    onClick={handleSelectItemClick}
                    className="block w-full rounded px-3 py-2 text-left text-sm text-gray-700 aria-selected:font-semibold aria-selected:text-gray-900 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus:bg-gray-100"
                  >
                    {item.label}
                  </button>
                </MenuItem>
              );
            })
          : props.items.map((item) => {
              const handleActionItemClick = () => {
                item.onClick();
              };

              return (
                <MenuItem key={item.id} disabled={item.disabled}>
                  <button
                    type="button"
                    disabled={item.disabled}
                    onClick={handleActionItemClick}
                    className="block w-full rounded px-3 py-2 text-left text-sm text-gray-700 data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus:bg-gray-100"
                  >
                    {item.label}
                  </button>
                </MenuItem>
              );
            })}
      </MenuItems>
    </Menu>
  );
}

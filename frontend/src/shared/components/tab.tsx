'use client';

import { cn } from '@lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type Item = {
  text: string;
  slug?: string;
  segment?: string;
};

export const Tab = ({ path, item }: { path: string; item: Item }) => {
  const pathname = usePathname();

  const href = item.slug ? path + '/' + item.slug : path;
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn('rounded-lg px-3 py-1 text-sm font-medium', {
        'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-white': isActive,
      })}
    >
      {item.text}
    </Link>
  );
};
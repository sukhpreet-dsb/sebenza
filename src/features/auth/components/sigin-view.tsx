import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { IconStar } from '@tabler/icons-react';
import { Metadata } from 'next';
import Link from 'next/link';
import UserAuthForm from './user-auth-form';
import Image from 'next/image';
import logo from '../../../../public/logo.svg';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignInViewPage({ stars }: { stars: number }) {
  return (
    <div className='relative h-screen flex-col items-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='hidden h-full flex-col items-center justify-center bg-zinc-900 p-10 text-white lg:flex dark:border-r'>
        <Image src={logo} alt='logo' />
      </div>
      <div className='flex h-full w-full items-center p-4 lg:p-8'>
        <div className='mx-auto flex w-full flex-col px-4 md:px-10'>
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}

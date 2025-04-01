'use client';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import Image from 'next/image';
import logo from '../../public/logo.svg';
import favicon from '../../public/favicon.png';


export function OrgSwitcher() {
  const { state } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {state == 'collapsed' ? (
                <Image src={favicon} alt='sebenza-logo' className='mt-2' />
              ) : (
                <Image src={logo} alt='sebenza-logo' width={180} />
              )}
              {/* <Image src={logo} alt='sebenza-logo' width={180}/> */}
              {/* <div className='bg-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <GalleryVerticalEnd className='size-4' />
              </div>
              <div className='flex flex-col gap-0.5 leading-none'>
                <span className='font-semibold'>Sebenza Nathi</span>
              </div> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

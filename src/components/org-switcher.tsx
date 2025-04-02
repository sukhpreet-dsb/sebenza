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
                <Image
                  src={favicon}
                  alt='sebenza-logo'
                  width={40}
                  className='mt-2'
                />
              ) : (
                <Image src={logo} alt='sebenza-logo' width={180} />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

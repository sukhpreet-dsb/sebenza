import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
}

export interface GarbageList {
  id: number;
  status: string;
  garbageWeight: string;
  date: string;
  time: string;
  address: {
    houseNumber: string;
    street: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
  };
  notes: string;
}

export interface CollectionList {
  id: string;
  name: string;
  email: string;
  phone: string;
  zone: string;
  status: string;
  collectionsCompleted: number;
  joinedDate: string;
}

export interface ZoneData {
  id: string;
  name: string;
  collectors: number;
  requests: number;
  completed: number;
  utilization: number;
}

export interface CollectedItem {
  type: string;
  weight: number;
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

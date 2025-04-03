import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sigin-view';

export const metadata: Metadata = {
  title: 'Authentication | Sign In',
  description: 'Sign In page for authentication.'
};

export default async function Page() {
  // let stars = 3000; // Default value

  try {
    const response = await fetch(
      'https://api.github.com/repos/kiranism/next-shadcn-dashboard-starter',
      {
        next: { revalidate: 3600 }
      }
    );

    if (response.ok) {
      // const data = await response.json();
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching GitHub stars:', error);
  }
  return <SignInViewPage />;
}

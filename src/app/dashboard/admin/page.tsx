import { SearchParams } from 'nuqs/server';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Admin : dashboard'
};

export default async function Page({ searchParams }: pageProps) {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Admin' description='Dashbaord Pannel' />
        </div>
        <Separator />
      </div>
    </PageContainer>
  );
}

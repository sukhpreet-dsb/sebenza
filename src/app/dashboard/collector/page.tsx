import { SearchParams } from 'nuqs/server';
import CollectorDasboard from '@/features/collector/components/collector-dashboard';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata = {
  title: 'Collector : dashboard'
};

export default async function Page({ searchParams }: pageProps) {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='Previous Events' description='List Of Previous Events' />
        </div>
        <Separator />
        <CollectorDasboard />
        {/* <Suspense
                key={key}
                fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
              >
                <ProductListingPage />
              </Suspense> */}
      </div>
    </PageContainer>
  );
}

import CollectorDasboard from '@/features/collector/components/collector-dashboard';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export const metadata = {
  title: 'Collector : dashboard'
};

export default async function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Previous Events'
            description='List of Previous Events'
          />
        </div>
        <Separator />
        <CollectorDasboard />
      </div>
    </PageContainer>
  );
}

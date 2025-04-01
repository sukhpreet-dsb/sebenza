import PageContainer from '@/components/layout/page-container';
import ProfileCreateForm from './profile-create-form';
import Profile from './profile-views';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function ProfileViewPage() {
  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading title='User' description='View your Profile' />
        </div>
        <Separator />
        <Profile />
      </div>
      {/* <ProfileCreateForm categories={[]} initialData={null} /> */}
    </PageContainer>
  );
}

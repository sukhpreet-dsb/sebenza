import { delay } from '@/constants/mock-api';
import CollectorsList from '@/features/admin/components/collector-list';

export default async function CollectorPage() {
  await await delay(2000);
  return <CollectorsList />;
}

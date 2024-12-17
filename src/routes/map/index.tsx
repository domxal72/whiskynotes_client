import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { TDistillery } from '../../types/distillery';
import { getRequest } from '../../api/request';

import MapView from '../../components/map-view';

// import data from './data-mock.json';

export const Route = createFileRoute('/map/')({
  component: () => <MapRoute />,
});

export function MapRoute() {
  const { data, isPending } = useQuery({
    queryKey: ['distilleries'],
    queryFn: async (): Promise<TDistillery[]> => {
      return await getRequest(`distilleries/geojson.json`);
    },
  });

  if (isPending) {
    return <div>Loading map...</div>;
  }

  return <MapView data={data} />;
}

// TODO: data component example - refactor or delete
// function test<T extends () => unknown>(
//   fn: T,
//   data: Parameters<T>[0][]
// ): ReturnType<T>[] {
//   return [];
// }

import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import 'ol/ol.css';

import { IDistillery } from '../../types/distillery';
import { getRequest } from '../../api/request';

import MapView from '../../components/map-view';

export const Route = createFileRoute('/map/')({
  component: () => <MapRoute />,
});

export function MapRoute() {
  const { data, isPending } = useQuery({
    queryKey: ['distilleries'],
    queryFn: async (): Promise<IDistillery[]> => {
      // return await getRequest(`distilleries/`);
      return await getRequest(`distilleries/geojson.json`);
    },
  });

  if (isPending) {
    return <div>Loading map...</div>;
  }

  return <MapView data={data} />;
}

function test<T extends () => unknown>(
  fn: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return [];
}

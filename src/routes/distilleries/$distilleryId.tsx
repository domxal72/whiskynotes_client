import { createFileRoute } from '@tanstack/react-router';

import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../api/request';
import { AxiosResponseSchema, IDistillery } from '../../types/distillery';

export const Route = createFileRoute('/distilleries/$distilleryId')({
  component: Distillery,
});

function Distillery() {
  const { distilleryId } = Route.useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['distilleriesId'],
    queryFn: async (): Promise<AxiosResponseSchema<IDistillery[]>> =>
      getRequest(`distilleries/${distilleryId}`),
  });

  console.log(data);

  if (isPending) {
    return <span>loading..</span>;
  }

  if (error) {
    return <span>error</span>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Founded</th>
            <th>Region</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map(({ id, name, country, founded, region, website }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{country}</td>
              <td>{founded}</td>
              <td>{region}</td>
              <td>{website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { createFileRoute, Link } from '@tanstack/react-router';

import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../api/request';
import { AxiosResponseSchema } from '../../types/distillery';
import { IProducts } from '../../types/products';

export const Route = createFileRoute('/products/')({
  component: Products,
});

function Products() {
  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<IProducts[]> => {
      const res = await getRequest('products/');
      return await res.data;
    },
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
          {data.map(({ id, name }) => (
            <tr key={id}>
              <td>
                {/* <Link
                  to='/distilleries/$distilleryId'
                  params={{ distilleryId: id.toString() }}
                > */}
                {name}
                {/* </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

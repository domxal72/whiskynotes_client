import { createFileRoute, Link } from '@tanstack/react-router';

import { useQuery } from '@tanstack/react-query';
import { getRequest } from '../../api/request';
import { AxiosResponseSchema } from '../../types/distillery';
import { IProduct } from '../../types/products';

export const Route = createFileRoute('/products/$productId')({
  component: Product,
});

function Product() {
  const { productId } = Route.useParams();

  // Intercept to avoid data.data object in response
  // getRequest.interceptors.response.use(async function (response) {
  //   return response.data;
  // });
  // getRequest.interceptors.response.use((res) => res.data);

  // async function getReq() {
  //   const res = await getRequest(`products/${productId}`);
  //   return await res.data;
  // }

  // getReq();

  const { isPending, error, data } = useQuery({
    queryKey: ['productId'],
    queryFn: async (): Promise<IProduct[]> => {
      const res = await getRequest(`products/${productId}`);
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
            <th>Description</th>
            <th>Distillery</th>
            <th>Vol</th>
            <th>Peated</th>
            <th>Image</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {data.map(
            ({
              id,
              name,
              vol,
              description,
              distillery_id,
              distillery_name,
              is_peated,
              stated_age,
            }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{description}</td>
                <td>
                  <Link to={`/distilleries/${distillery_id}`}>
                    {distillery_name}
                  </Link>
                </td>
                <td>{vol}</td>
                <td>{is_peated}</td>
                <td>{stated_age}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

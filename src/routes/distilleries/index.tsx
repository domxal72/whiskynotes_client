import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequest } from '../../api/request';
import { TDistillery } from '../../types/distillery';

export const Route = createFileRoute('/distilleries/')({
  component: Distilleries,
});

function Distilleries() {
  const queryClient = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ['distilleries'],
    queryFn: async (): Promise<TDistillery[]> => {
      return await getRequest(`distilleries/`);
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      country,
    }: {
      country: string;
    }): Promise<TDistillery[]> => {
      return await getRequest(`distilleries/?country=${country}`);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['distilleries'], () => {
        return [...data];
      });
    },
  });

  const handleMutateCountry = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    mutate({ country: e.target.value });
  };

  if (isPending) {
    return <span>loading..</span>;
  }

  if (isError) {
    return <span>error</span>;
  }

  return (
    <DistilleriesView data={data} handleMutateCountry={handleMutateCountry} />
  );
}

type TDistilleriesViewProps = {
  data: TDistillery[];
  handleMutateCountry: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function DistilleriesView({
  data,
  handleMutateCountry,
}: TDistilleriesViewProps) {
  return (
    <div>
      <div></div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              <select
                defaultValue={''}
                name='select-country'
                id='select-country'
                onChange={handleMutateCountry}
              >
                <option value=''>Country:</option>
                <option value='Japan'>Japan</option>
                <option value='Scotland'>Scotland</option>
              </select>
            </th>
            <th>Founded</th>
            <th>Region</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, country, founded, region, website }) => (
            <tr key={id}>
              <td>
                <Link to='/distilleries/$id' params={{ id: id.toString() }}>
                  {name}
                </Link>
              </td>
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

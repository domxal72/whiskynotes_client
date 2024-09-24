import { createFileRoute, Link } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import {
  useQuery,
  useMutation,
  QueryClient,
  useQueryClient,
} from '@tanstack/react-query';
import { getRequest, postRequest } from '../../api/request';
import { AxiosResponseSchema, IDistillery } from '../../types/distillery';
import axios from 'axios';

export const Route = createFileRoute('/distilleries/')({
  component: Distilleries,
});

function Distilleries() {
  const [country, setCountry] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [id, setId] = useState<string>('');

  const queryClient = useQueryClient();

  const { isPending, isError, data } = useQuery({
    queryKey: ['distilleries'],
    queryFn: async (): Promise<IDistillery[]> => {
      return await getRequest(
        `distilleries/?country=${country}&region=${region}`
      );
    },
  });

  const { mutate } = useMutation({
    mutationFn: async ({
      country,
    }: {
      country: string;
    }): Promise<IDistillery[]> => {
      return await getRequest(`distilleries/?country=${country}`);
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(['distilleries'], (oldData: IDistillery[]) => {
        console.log(data);
        return [
          // ...oldData,
          ...data,
        ];
      });
    },
  });

  const handleSelectCountry = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCountry(e.target.value);
    await queryClient.invalidateQueries({
      queryKey: ['distilleries'],
    });
  };

  const handleMutateCountry = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    mutate({ country: e.target.value });
  };

  console.log(data);

  if (isPending) {
    return <span>loading..</span>;
  }

  if (isError) {
    return <span>error</span>;
  }

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
                {/* <Link
                  to='/distilleries/$distilleryId'
                  params={{ distilleryId: id.toString() }}
                > */}
                {name}
                {/* </Link> */}
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

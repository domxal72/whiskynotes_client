import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest, updateRequest } from '../../api/request';
import { IDistillery } from '../../types/distillery';

export const Route = createFileRoute('/distilleries/search')({
  component: DistillerySearch,
});

function DistillerySearch() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['distilleriesSearch'],
    queryFn: async (): Promise<IDistillery[]> =>
      postRequest({
        url: `distilleries/distillery/search`,
        data: { search: '' },
      }),
    // getRequest(`distilleries/search/:name`),
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (value: string) => {
      console.log({ search: value });
      // Return data stored to database
      return await postRequest({
        url: 'distilleries/distillery/search',
        data: { search: value },
      });
    },
    onSuccess: (data, variables) => {
      console.log(data);
      console.log(variables);
      // queryClient.invalidateQueries({ queryKey: ['distilleriesSearch'] });
      // queryClient.fetchQuery({
      //   queryKey: ['distilleriesSearch'],
      //   queryFn: async (): Promise<IDistillery[]> =>
      //     postRequest({
      //       url: `distilleries/distillery/search`,
      //       data: { search: variables },
      //     }),
      // });
      queryClient.setQueryData(['distilleriesSearch'], data);
    },
  });

  const handleMutate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // if (value.length >= 2) {
    mutateAsync(value);
    // }
  };

  if (isPending || error) {
    return 'no data';
  }

  return (
    <div>
      <div className='flex flex-col'>
        <label htmlFor='search'>search:</label>
        <input type='text' name='search' id='search' onChange={handleMutate} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

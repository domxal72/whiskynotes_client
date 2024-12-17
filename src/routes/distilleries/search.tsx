import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postRequest } from '../../api/request';
import { TDistillery } from '../../types/distillery';

export const Route = createFileRoute('/distilleries/search')({
  component: DistillerySearch,
});

function DistillerySearch() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['distilleriesSearch'],
    queryFn: async (): Promise<TDistillery[]> =>
      postRequest({
        url: `distilleries/distillery/search`,
        data: { search: '' },
      }),
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
    onSuccess: (data) => {
      queryClient.setQueryData(['distilleriesSearch'], data);
    },
  });

  const handleMutate = (e: React.ChangeEvent<HTMLInputElement>) => {
    mutateAsync(e.target.value);
  };

  if (isPending || error) {
    return 'no data';
  }

  return <DistillerySearchView data={data} handleMutate={handleMutate} />;
}

type TDistillerySearchViewProps = {
  data: TDistillery[];
  handleMutate: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function DistillerySearchView({
  data,
  handleMutate,
}: TDistillerySearchViewProps) {
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

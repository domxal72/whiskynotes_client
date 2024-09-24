import { Children, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from '@tanstack/react-query';

import { postRequest, getRequest } from './api/request';

const queryClient = new QueryClient();

type TDistillery = {
  name: string;
};

function Mutate() {
  const [name, setName] = useState('');

  const { reset, mutate, mutateAsync, isPending, isSuccess } = useMutation({
    mutationFn: async ({ name }: { name: string }) => {
      const res = await postRequest({
        url: '/',
        data: { name },
      });
      // Return data stored to database
      return res;
    },
    onSuccess: async (data, variables) => {
      queryClient.setQueryData(
        ['distilleriesData'],
        (oldData: TDistillery[]) => [...oldData, data]
      );
    },
  });

  return (
    <div>
      <input type='text' onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          mutate({ name });
        }}
      >
        ad product
      </button>
      {isPending ? <div>Mutating..</div> : null}
      {isSuccess ? <div>Todo added!</div> : null}
    </div>
  );
}

function Request() {
  async function getDistilleries(): Promise<TDistillery[]> {
    setQueryData(data);
    return await getRequest('/');
  }

  const [queryData, setQueryData] = useState<unknown>();

  const { isPending, error, data } = useQuery({
    queryKey: ['distilleriesData'],
    queryFn: getDistilleries,
  });

  if (isPending) {
    return <span>Pending...</span>;
  }

  if (error) {
    return <span>error...</span>;
  }

  return (
    <div className='text-primary'>
      <button
        onClick={() => {
          setQueryData((state) => [{ name: 'novy' }, ...state]);
        }}
      >
        add
      </button>
      {/* <ul>
        {data.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul> */}
      <ul>
        {data.map(({ name }, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

// function TestRequest({ data }) {
//   return (
//     <div className='text-primary'>
//       <ul>
//         {data.map(({ name }, index) => (
//           <li key={index}>{name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function withLoading(Component, queryKey, queryFn) {
//   return function WithLoading() {
//     const { isPending, error, data } = useQuery({
//       queryKey: [queryKey],
//       queryFn: queryFn,
//     });

//     if (isPending) {
//       return <span>loading..</span>;
//     }

//     if (error) {
//       return <span>error</span>;
//     }

//     return <Component data={data} />;
//   };
// }

// const RquestWithLoading = withLoading(
//   TestRequest,
//   'distilleriesData',
//   getDistilleries
// );

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Mutate />
      <Request />
      {/* <RquestWithLoading /> */}
    </QueryClientProvider>
  );
}

export default App;

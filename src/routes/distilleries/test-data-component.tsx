import React, { FC } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest, updateRequest } from '../../api/request';
import { TDistillery } from '../../types/distillery';

export const Route = createFileRoute('/distilleries/test-data-component')({
  component: DistilleryTest,
});

type TCustomComponent<Type> = ({ data }: { data: Type[] }) => JSX.Element;

type TUseDataProps<Type> = {
  noDataMsg: string;
  // Component: FC // pokud by to byla obecna functional komponenta
  Component: TCustomComponent<Type>;
  src: string;
};

function useData<T>({
  noDataMsg = 'default msg',
  Component,
  src = '',
}: TUseDataProps<T>) {
  const { isPending, error, data } = useQuery({
    queryKey: ['distilleriesTest'],
    queryFn: async (): Promise<T[]> => getRequest(src),
  });

  if (isPending || error) {
    return <div>{noDataMsg}</div>;
  }

  return (
    <div>
      <Component data={data} />
    </div>
  );
}

function ViewComponentDistilleries({ data }: { data: TDistillery[] }) {
  return (
    <div>
      <div className='flex'>
        <div>ID</div>
        <div>IName</div>
      </div>
      <div>
        {data.map(({ id, name }) => (
          <div key={id} className='flex'>
            <td>{id}</td>
            <td>{name}</td>
          </div>
        ))}
      </div>
    </div>
  );
}

function DistilleryTest() {
  const view = useData<TDistillery>({
    noDataMsg: 'overriden message',
    Component: ViewComponentDistilleries,
    src: 'distilleries/',
  });

  return view;
}

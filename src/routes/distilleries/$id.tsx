import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';

import { useQuery } from '@tanstack/react-query';
import { getRequest, deleteRequest, updateRequest } from '../../api/request';
import { TDistillery } from '../../types/distillery';

export const Route = createFileRoute('/distilleries/$id')({
  component: Distillery,
});

function Distillery() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ['distilleryId'],
    queryFn: async (): Promise<TDistillery[]> =>
      getRequest(`distilleries/distillery/${id}`),
  });

  const handleDelete = async (id: number) => {
    await deleteRequest(`distilleries/distillery/${id}`);
    navigate({ to: '/distilleries' });
  };

  if (isPending) {
    return <span>loading..</span>;
  }

  if (error) {
    return <span>error</span>;
  }

  return (
    <div>
      <DistilleryUpdateForm data={data} />
      <DistilleriesTable data={data} handleDelete={handleDelete} />
    </div>
  );
}

type TDistilleriesTableProps = {
  data: TDistillery[];
  handleDelete: (id: number) => void;
};

function DistilleriesTable({ data, handleDelete }: TDistilleriesTableProps) {
  return (
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
        {data.map(({ id, name, country, founded, region, website }) => (
          <tr key={id}>
            <td>{name}</td>
            <td>{country}</td>
            <td>{founded}</td>
            <td>{region}</td>
            <td>{website}</td>
            <td>
              <button onClick={() => handleDelete(id)}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function DistilleryUpdateForm({ data }: { data: TDistillery[] }) {
  const navigate = useNavigate();

  const addProductForm = useForm({
    defaultValues: {
      id: data[0].id ?? 0,
      name: data[0].name ?? '',
      country: data[0].country ?? '',
      founded: data[0].founded ?? 0,
    },
    onSubmit: async ({ value }) => {
      await updateRequest({
        url: `distilleries/distillery/${value.id}`,
        data: { value },
      });
      navigate({ to: '/distilleries' });
    },
  });

  if (!data) {
    return <div>no data..</div>;
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addProductForm.handleSubmit();
        }}
        className='flex flex-wrap'
      >
        <div className='flex flex-col'>
          <addProductForm.Field
            name='id'
            children={(field) => (
              <>
                <label htmlFor='id'>id:</label>
                <input
                  name={field.name}
                  hidden
                  readOnly
                  type='text'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                />
              </>
            )}
          />
        </div>
        <div className='flex flex-col'>
          <addProductForm.Field
            name='name'
            children={(field) => (
              <>
                <label htmlFor='name'>name:</label>
                <input
                  name={field.name}
                  type='text'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <div className='flex flex-col'>
          <addProductForm.Field
            name='country'
            children={(field) => (
              <>
                <label htmlFor='country'>country:</label>
                <input
                  name={field.name}
                  type='text'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <div className='flex flex-col'>
          <addProductForm.Field
            name='founded'
            children={(field) => (
              <>
                <label htmlFor='founded'>founded:</label>
                <input
                  name={field.name}
                  type='number'
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) =>
                    field.handleChange(parseFloat(e.target.value))
                  }
                />
              </>
            )}
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import axios from 'axios';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRequest, postRequest } from '../../api/request';
import { IProduct } from '../../types/products';
import { getUserFromStorage } from '../../utils/getUser';
import RequireAuth from '../../components/RequireAuth';

export const Route = createFileRoute('/products/')({
  // component: Products,
  component: () => {
    if (getUserFromStorage()) {
      return <Products />;
    } else {
      return <RequireAuth />;
    }
  },

  // for redirection
  // beforeLoad: async ({ location }) => {
  //   if (!getUserFromStorage()) {
  //     throw redirect({
  //       to: '/auth/login',
  //       search: {
  //         // Use the current location to power a redirect after login
  //         // (Do not use `router.state.resolvedLocation` as it can
  //         // potentially lag behind the actual current location)
  //         redirect: location.href,
  //       },
  //     });
  //   }
  // },
});

function Products() {
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: async (): Promise<IProduct[]> => {
      return await getRequest('products/');
    },
  });

  const {
    isPending: distilleriesPending,
    error: distilleriesError,
    data: distilleries,
  } = useQuery({
    queryKey: ['distilleries'],
    queryFn: async (): Promise<IProduct[]> => {
      return await getRequest('distilleries/names');
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (formData: FormData) => {
      // mutationFn: async (value: IProduct) => {
      // Return data stored to database
      return await postRequest({
        url: 'products/',
        data: formData,
        // data: { value },
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    },
    onSuccess: (data, variables) => {
      console.log(data);
      queryClient.setQueryData(['products'], (oldData: IProduct[]) => [
        ...oldData,
        data,
      ]);
      // queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const addProductForm = useForm({
    defaultValues: {
      id: 0, // TODO: mam tam pridavat ID kvuli typescriptu nebo ne?
      name: '',
      description: '',
      distilleryId: 2161,
      ABV: 0,
      vol: 0,
      isPeated: false,
      age: 0,
      rating: 0,
      status: 'none',
      imgFile: null,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      console.log(value);
      formData.append('imgFile', value.imgFile);
      // formData.append('name', value.name);
      // formData.append('description', value.description);
      // formData.append('distilleryId', value.distilleryId);
      // formData.append('ABV', value.ABV);
      // formData.append('vol', value.vol);
      // formData.append('status', value.status);
      // formData.append('rating', value.rating);
      // formData.append('age', value.age);
      formData.append('value', value);
      mutateAsync(formData);
      // mutateAsync(value);
    },
  });

  if (isPending) {
    return <span>loading..</span>;
  }

  if (error) {
    return <span>error</span>;
  }

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(addProductForm.state);
            addProductForm.handleSubmit();
          }}
          className='flex flex-wrap gap-2'
          encType='multipart/form-data'
          method='post'
        >
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
              name='description'
              children={(field) => (
                <>
                  <label htmlFor='description'>description:</label>
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
              name='ABV'
              children={(field) => (
                <>
                  <label htmlFor='ABV'>ABV:</label>
                  <input
                    name={field.name}
                    type='number'
                    step='0.01'
                    inputMode='decimal'
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
          <div className='flex flex-col'>
            <addProductForm.Field
              name='vol'
              children={(field) => (
                <>
                  <label htmlFor='vol'>vol:</label>
                  <input
                    name={field.name}
                    type='number'
                    step='0.01'
                    inputMode='decimal'
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
          <div className='flex flex-col'>
            <addProductForm.Field
              name='isPeated'
              children={(field) => (
                <>
                  <label htmlFor='isPeated'>isPeated:</label>
                  <input
                    name={field.name}
                    checked={field.state.value}
                    type='checkbox'
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(Boolean(e.target.value))
                    }
                  />
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <addProductForm.Field
              name='age'
              children={(field) => (
                <>
                  <label htmlFor='age'>age:</label>
                  <input
                    name={field.name}
                    value={field.state.value}
                    type='text'
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value))
                    }
                  />
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <addProductForm.Field
              name='distilleryId'
              children={(field) => (
                <>
                  <label htmlFor='distilleryId'>distillery:</label>
                  <select
                    name={field.name}
                    defaultValue={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value))
                    }
                  >
                    {/* <option value='2161'>unknown</option> */}
                    {distilleries?.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <addProductForm.Field
              name='status'
              children={(field) => (
                <>
                  <label htmlFor='status'>status:</label>
                  <select
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value='none'>none</option>
                    <option value='wish'>wish</option>
                    <option value='tasted'>tasted</option>
                    <option value='in collection'>in collection</option>
                  </select>
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <addProductForm.Field
              name='rating'
              children={(field) => (
                <>
                  <label htmlFor='rating'>rating:</label>
                  <input
                    name={field.name}
                    type='number'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(parseInt(e.target.value))
                    }
                  />
                </>
              )}
            />
          </div>
          <div className='flex flex-col'>
            <addProductForm.Field
              name='imgFile'
              children={(field) => (
                <>
                  <label htmlFor='imgFile'>imgFile:</label>
                  <input
                    name={field.name}
                    type='file'
                    // value={''}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      field.handleChange(e.target.files[0])
                    }
                  />
                </>
              )}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>ABV</th>
            <th>peated</th>
          </tr>
        </thead>
        <tbody>
          {data.map(({ id, name, description, ABV, is_peated }) => (
            <tr key={id}>
              <td>
                <Link to='/distilleries/$id' params={{ id: id?.toString() }}>
                  {name}
                </Link>
              </td>
              <td>{description}</td>
              <td>{ABV}</td>
              <td>{is_peated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form
        action='http://localhost:3000/products/'
        className='flex flex-wrap gap-2'
        encType='multipart/form-data'
        method='post'
      >
        <label htmlFor='imgFile'>imgFile:</label>
        <input
          name='imgFile'
          type='file'
          // value={''}
        />
        <button type='submit'>Submit only</button>
      </form>
    </div>
  );
}

import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { zodValidator, ZodValidator } from '@tanstack/zod-form-adapter';
import axios from 'axios';
import { z } from 'zod';
import { emptyStringToNullByDefault } from '../../utils/zod';

import { getRequest, postRequest } from '../../api/request';
import { IProduct, productSchema } from '../../types/products';
import { getUserFromStorage } from '../../utils/getUser';
import RequireAuth from '../../components/RequireAuth';
import { getUrl } from '../../utils/getUrl';

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

type ProductSchema = z.infer<typeof productSchema>;

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

  const getProduct = useQuery({
    queryKey: ['productsId'],
    queryFn: async (): Promise<IProduct> => {
      return await getRequest('products/245');
    },
  });

  console.log(getProduct.data);

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

  // const addProductForm = useForm<ProductSchema, ZodValidator>({
  const addProductForm = useForm<ProductSchema, ZodValidator>({
    // const addProductForm = useForm({
    defaultValues: {
      name: '',
      description: getProduct?.data?.description ?? '',
      // description: '',
      ABV: '',
      vol: '',
      age: '',
      rating: '',
      distilleryId: 2161,
      isPeated: false,
      status: 'none',
      imgFile: null,
      price: '',
    },
    validators: {
      // onSubmit: productSchema,
    },
    validatorAdapter: zodValidator(),
    onSubmit: async ({ value }) => {
      const form = document.getElementById('postProduct') as HTMLFormElement;
      // Pokud zadam form element jako parametr tak si to automaticky nacte vsechny inputy,
      // co v ty forme jsou a nemusim je tam jak kokot vypisovat pres append, napr:
      // formData.append('description', value.description);
      const formData = new FormData(form);
      mutateAsync(formData);
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
      <button>get Product</button>
      <div>
        <form
          id='postProduct'
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addProductForm.handleSubmit();
            console.log(addProductForm.state);
          }}
          className='flex flex-wrap gap-2'
          encType='multipart/form-data'
          method='post'
        >
          <div className='flex flex-col'>
            <addProductForm.Field
              name='name'
              validators={{
                onSubmit: z.string().min(1, {
                  message: 'This field is required',
                }),
                // onChange: z.coerce.number({ message: 'not a number..' }),
              }}
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
                  <FieldInfo field={field} />
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
              validators={{
                onChange: z.coerce.number({ message: 'must be a number' }),
                onSubmit: z.coerce.number({
                  message: 'must be a number submit',
                }),

                // onChange: z.preprocess(
                //   (val) => Number(val),
                //   z.number({ message: 'must be a number' })
                // ),
              }}
              children={(field) => (
                <>
                  <label htmlFor='ABV'>ABV(%):</label>
                  <input
                    name={field.name}
                    type='text'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      const val = e.target.value;
                      return field.handleChange(val);
                    }}
                  />
                  <FieldInfo field={field} />
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
              validators={
                {
                  // onChange: console.log()
                }
              }
              children={(field) => (
                <>
                  <label htmlFor='imgFile'>imgFile:</label>
                  <input
                    name={field.name}
                    type='file'
                    id='fileInput'
                    // value={''}
                    accept='image/*'
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      console.log(document.getElementById('fileInput')?.files);
                      return field.handleChange(e.target.files[0]);
                    }}
                  />
                </>
              )}
            />
          </div>
          <addProductForm.Subscribe
            selector={(state) => [state.errorMap]}
            children={([errorMap]) =>
              errorMap.onSubmit ? (
                <div>
                  <em>There was an error on the form: {errorMap.onSubmit}</em>
                </div>
              ) : null
            }
          />
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
          {data.map(({ id, name, description, ABV, is_peated, image_url }) => (
            <tr key={id}>
              <td>
                <Link to='/distilleries/$id' params={{ id: id?.toString() }}>
                  {name}
                </Link>
              </td>
              <td>{description}</td>
              <td>{ABV}</td>
              <td>{is_peated}</td>
              <td>
                <img
                  src={getUrl('uploads/images/') + image_url}
                  alt={image_url}
                />
              </td>
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

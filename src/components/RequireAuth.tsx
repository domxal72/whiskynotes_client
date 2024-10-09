function RequireAuth({ type }: { type?: string }) {
  return (
    <div>
      <p>
        {type === 'unauthorized'
          ? 'You dont have rights to see this page'
          : 'You need to log in to access this page'}
      </p>
    </div>
  );
}

export default RequireAuth;

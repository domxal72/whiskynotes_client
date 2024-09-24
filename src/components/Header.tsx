import { Link } from '@tanstack/react-router';

function Header() {
  const linkClass = '[&.active]:underline hover:text-shade p-2 transition-all';

  return (
    <header className='p-2 flex gap-2 bg-primary text-white text-xl fixed w-full h-16'>
      <div className='max-w-320 m-auto w-full'>
        <Link to='/' className={linkClass}>
          Home
        </Link>{' '}
        <Link to='/about' className={linkClass}>
          About
        </Link>
        <Link to='/distilleries' className={linkClass}>
          Distilleries
        </Link>
        <Link to='/products' className={linkClass}>
          Products
        </Link>
        <Link to='/auth/sign-in' className={linkClass}>
          Sign in
        </Link>
        <Link to='/auth/login' className={linkClass}>
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;

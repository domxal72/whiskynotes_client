import { Link } from '@tanstack/react-router';

type TLink = {
  linkName: string;
  href: string;
};

const links: TLink[] = [
  {
    linkName: 'Home',
    href: '/',
  },
  {
    linkName: 'About',
    href: '/about',
  },
  {
    linkName: 'Distilleries',
    href: '/distilleries',
  },
  {
    linkName: 'Products',
    href: '/products',
  },
  {
    linkName: 'Sign in',
    href: '/auth/sign-in',
  },
  {
    linkName: 'Login',
    href: '/auth/login',
  },
  {
    linkName: 'Map',
    href: '/map',
  },
  {
    linkName: 'Test',
    href: '/distilleries/context-test-component',
  },
];

function Header() {
  return (
    <header className='p-2 flex gap-2 bg-primary text-white text-xl fixed w-full h-16'>
      <ul className='max-w-320 m-auto w-full flex items-center'>
        {links.map(({ linkName, href }) => (
          <li>
            <Link
              to={href}
              className='[&.active]:underline hover:text-shade p-2 transition-all'
            >
              {linkName}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

export default Header;

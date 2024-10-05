import type { MetaFunction, LinksFunction } from '@remix-run/node';
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import '~/styles.css';

export const links: LinksFunction = () => [];

export const meta: MetaFunction = () => [
  {
    charset: 'utf-8',
    title: 'Remix - Conform Example',
    viewport: 'width=device-width,initial-scale=1',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <main>
        <h1>Remix Example</h1>
        <p>
          This example demonstrates some of the features of Conform including{' '}
          <strong>client validation</strong>, <strong>nested list</strong>,
          and <strong>async validation with zod</strong>.
        </p>
        <ul>
          <li>
            <Link to="login">Login</Link> (
            <Link to="login-fetcher">with useFetcher</Link>)
          </li>
          <li>
            <Link to="todos">Todo list</Link>
          </li>
          <li>
            <Link to="signup">Signup</Link>
          </li>
        </ul>
        <hr />
        <Outlet />
      </main>
    </>
  );
}

import { LoaderFunction, json } from '@remix-run/server-runtime'
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({
  request,
  context,
  params,
}) => {
  console.log(request)
  console.log(params)
  console.log(context)

  return json({ index: 'index' })
};

export default function App() {
  return (
    <>
      <p>index</p>
      <Outlet />
    </>
  );
}

"use client";

import React, { Suspense } from "react";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = React.useState<any>("https://server.data");

  return (
    <>
      <div>show case</div>
      <div>this is top </div>
      <div>{data}</div>
      <Suspense>{children}</Suspense>
      <div>this is bottom</div>
    </>
  );
}

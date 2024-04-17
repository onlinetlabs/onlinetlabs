'use client';

import { Layout } from "@app/layout";
import { Header } from "@widgets/header";
import { Navbar } from "@widgets/navbar";

export default function Home() {
  return (
    <Layout
      header={<Header />}
      navbar={<Navbar />}
    >
      root page
    </Layout>
  );
}

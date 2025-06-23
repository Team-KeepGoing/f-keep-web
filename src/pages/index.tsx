import Head from 'next/head';
import React from 'react';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/hero.webp" />
      </Head>

      <main>
        <Image
          src="/hero.webp"
          alt="히어로 이미지"
          width={1200}
          height={600}
          priority
        />
        <h1>환영합니다!</h1>
      </main>
    </>
  );
}

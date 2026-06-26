'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Consolidated into /writing — redirect any old links.
export default function PreviousWorkRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/writing');
  }, [router]);
  return null;
}

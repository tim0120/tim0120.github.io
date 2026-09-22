'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Moved to /links — redirect any old links.
export default function RedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/links');
  }, [router]);
  return null;
}

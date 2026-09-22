'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Moved to /cv — redirect any old links.
export default function RedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/cv');
  }, [router]);
  return null;
}

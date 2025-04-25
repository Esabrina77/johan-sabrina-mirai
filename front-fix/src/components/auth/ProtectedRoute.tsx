'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface Props {
  children: React.ReactNode;
  role: 'freelancer' | 'company';
}

export default function ProtectedRoute({ children, role }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
      return;
    }

    if (user.role !== role) {
      const correctPath = user.role === 'freelancer' ? '/freelancer/dashboard' : '/company/dashboard';
      router.replace(correctPath);
    }
  }, [user, role, router]);

  if (!user) {
    return null;
  }

  if (user.role !== role) {
    return null;
  }

  return <>{children}</>;
} 
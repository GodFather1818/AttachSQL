// lib/withProtectedRoute.tsx
import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
  children: ReactNode;
  roles?: string[]; // Specify roles if needed
}

const withProtectedRoute = (WrappedComponent: React.ComponentType, roles?: string[]) => {
  const Wrapper = (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === 'loading') return; // Loading, do nothing
      if (!session) {
        // Not authenticated, redirect to login
        router.push('/api/auth/signin');
      } else if (roles && !roles.includes(session.user.role)) {
        // Not authorized, redirect to a forbidden page or error page
        router.push('/403'); // or any other page you prefer
      }
    }, [session, status]);

    if (status === 'loading' || !session || (roles && !roles.includes(session.user.role))) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withProtectedRoute;

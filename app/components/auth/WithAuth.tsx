import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

export function withAuth<P extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<P>
) {
  const WithAuth = (props: P) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          router.push("/login");
        }
      });

      return () => unsubscribe();
    }, [router]);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return WithAuth;
}

function getDisplayName<P>(WrappedComponent: React.ComponentType<P>): string {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

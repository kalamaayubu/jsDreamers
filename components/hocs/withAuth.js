import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { selectAuth } from '@/redux/authSlice';

export function withAuth(Component) {
    return function AuthHOC(props) {
        const user = useSelector(selectAuth);
        const router = useRouter();

        useEffect(() => {
            if (!user) router.push("/auth/login")
        }, [user])

        if (!user) return null

        return <Component {...props} />;
    };
}

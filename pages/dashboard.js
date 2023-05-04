import { useSession } from "next-auth/react"
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
    const { data: session } = useSession();

    if(!session?.user) {
        return 'Loading...';
    }

    return <EmptyState />;
}

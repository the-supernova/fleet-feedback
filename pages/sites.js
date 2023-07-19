import { useSession } from "next-auth/react"
import useSWR from 'swr'
import EmptyState from "../components/EmptyState";
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import DashboardShell from "../components/DashboardShell";
import fetcher from "../utils/fetcher";
import SiteTable from "../components/SiteTable";
import SiteTableHeader from "../components/SiteTableHeader";

export default function Dashboard() {
    const { data: session } = useSession();

    const { data, isLoading } = useSWR(session ? ['/api/sites'] : null, fetcher);

    if(!data || isLoading) return (
        <DashboardShell>
            <SiteTableHeader />
            <SiteTableSkeleton />
        </DashboardShell>
    )

    return (
        <DashboardShell>
            <SiteTableHeader />
            {data.sites.length ? (<SiteTable sites={data.sites} />) : (<EmptyState />)}
        </DashboardShell>
    )
}

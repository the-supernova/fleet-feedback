import { useSession } from "next-auth/react"
import useSWR from 'swr'
import SiteTableSkeleton from "../components/SiteTableSkeleton";
import DashboardShell from "../components/DashboardShell";
import fetcher from "../utils/fetcher";
import FeedbackTable from "../components/FeedbackTable";
import FeedbackTableHeader from "../components/FeedbackTableHeader";
import FeedbackEmptyState from "../components/FeedbackEmptyState";

export default function MyFeedback() {
    const { data: session } = useSession();

    const { data, isLoading } = useSWR(session ? ['/api/feedback'] : null, fetcher);

    if(!data || isLoading) return (
        <DashboardShell>
            <FeedbackTableHeader />
            <SiteTableSkeleton />
        </DashboardShell>
    )

    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data.feedback ? (<FeedbackTable allFeedback={data.feedback} />) : (<FeedbackEmptyState />)}
        </DashboardShell>
    )
}

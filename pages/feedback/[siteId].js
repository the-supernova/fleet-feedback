import { useSession } from "next-auth/react"
import useSWR from 'swr'
import SiteTableSkeleton from "../../components/SiteTableSkeleton";
import DashboardShell from "../../components/DashboardShell";
import fetcher from "../../utils/fetcher";
import FeedbackTable from "../../components/FeedbackTable";
import { useRouter } from "next/router";
import SiteFeedbackTableHeader from "../../components/SiteFeedbackTableHeaders";
import FeedbackEmptyState from "../../components/FeedbackEmptyState";

export default function SiteFeedback() {
    const { data: session } = useSession();
    const { query } = useRouter();
    const { data, isLoading } = useSWR(session ? [`/api/feedback/${query.siteId}`] : null, fetcher);

    if(!data || isLoading) return (
        <DashboardShell>
            <SiteFeedbackTableHeader />
            <SiteTableSkeleton />
        </DashboardShell>
    )

    return (
        <DashboardShell>
            <SiteFeedbackTableHeader siteName={data.site.name} />
            {data.feedback.length ? (<FeedbackTable allFeedback={data.feedback} />) : (<FeedbackEmptyState />)}
        </DashboardShell>
    )
}

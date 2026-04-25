import ProjectDetailPage from "./ProjectDetailPage"

const SLUGS = [
    "advante", "brandsonic", "devluvs", "future-founders",
    "incremental", "login-signup", "reviv", "scaleforge", "starseekr",
]

export function generateStaticParams() {
    return SLUGS.map((slug) => ({ slug }))
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    return <ProjectDetailPage slug={slug} />
}

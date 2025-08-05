import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter()

    return <p>Category: {router.query.slug}</p>
}
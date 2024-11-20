import { isAuthenticated } from "@/lib/auth";

export default function Dashboard() {
    if(!isAuthenticated()){
        return <p>You must be signed in to view this page</p>
    }

    return(
        <div className="flex flex-col justify-center min-h-screen">
            <h1>Dashboard</h1>
            <p>Welcome to dashboard</p>
        </div>
    )
}
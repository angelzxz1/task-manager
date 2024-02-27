import { AllTasks } from "@/components/task/all-tasks";
import { useGlobalContext } from "@/context/global-provider";
import { initialProfile } from "@/lib/initial-profile";

export default async function Home() {
    const profile = await initialProfile();
    return (
        <div className="h-full w-full p-8 flex flex-col">
            <h1
                className="text-4xl w-full text-violet-100 pt-4 pb-2 font-bold border-b border-violet-300
            "
            >
                All Tasks
            </h1>
            <section className="py-4 flex gap-4 flex-wrap">
                <AllTasks />
            </section>
        </div>
    );
}

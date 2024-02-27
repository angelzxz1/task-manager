import { AllTasks } from "@/components/task/all-tasks";
import { initialProfile } from "@/lib/initial-profile";

const Important = async () => {
    const profile = await initialProfile();
    return (
        <div className="h-full w-full p-8 flex flex-col">
            <h1
                className="text-4xl w-full text-violet-100 pt-4 pb-2 font-bold border-b border-violet-300
    "
            >
                Important Tasks
            </h1>
            <section className="flex-1 py-4">
                <AllTasks />
            </section>
        </div>
    );
};
export default Important;

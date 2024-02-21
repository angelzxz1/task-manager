import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export const AddTaskButton = () => {
    return (
        <Button
            className="absolute top-[1rem] right-[1rem]"
            variant="plus"
            size="icon"
        >
            <Plus />
        </Button>
    );
};

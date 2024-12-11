import React, { useState} from "react"
import CreateItemForm from "./CreateItemForm"
import ListItems from "./ListItems"

export default function ToDoListSection(){
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger((prev) => prev + 1); // Increment to trigger refresh
    };

    return (
        <section id="login" className="py-16 bg-gray-100">
            <div className="max-w-7xl w-full mx-auto bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">To Do List</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <ListItems trigger={refreshTrigger}/>
                    </div>
                    <div className="md:col-span-1">
                        <CreateItemForm onRefresh={handleRefresh} />
                    </div>
                </div>
            </div>
        </section>
    )
}
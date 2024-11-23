import React, { useState} from "react";
import CreateItemForm from "./item-sub-component/CreateItemForm";
import ListItems from "./item-sub-component/ListItems";
import DummyComponent from "./item-sub-component/DummyComponent";

export default function ItemFunctionality() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => {
        setRefreshTrigger((prev) => prev + 1); // Increment to trigger refresh
    };

    return (
        <>
        <div className="p-4 bg-slate-400">
            <header className="bg-yellow-600 gap-4 rounded">
            <h1 className="text-center text-3xl font-bold">Dummy App</h1>
            </header>
            <div class="grid grid-cols-5 gap-4 p-4">
            <div className="col-span-2 bg-yellow-500 rounded">
                <DummyComponent />
            </div>
            <div className="col-span-2 bg-yellow-400 rounded">
                <ListItems trigger={refreshTrigger}/>
            </div>
            <div className="col-span-1 bg-yellow-500 rounded">
                <CreateItemForm onRefresh={handleRefresh} />
            </div>
            </div>
            <footer className="bg-yellow-200 gap-4 rounded">
            <h4 className="text-center text-sm">Thanks to use this template</h4>
            </footer>
        </div>
        </>
    )
}
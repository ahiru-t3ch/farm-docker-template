import FastApiGet from "./FastApiGet"

export default function FeaturesSection() {
    return (
        <section id="features" className="py-16 bg-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <FastApiGet />
                <div className="p-6 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold mb-2">Feature 2</h3>
                    <p className="text-gray-600">Description of feature 2.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded shadow">
                    <h3 className="text-lg font-bold mb-2">Feature 3</h3>
                    <p className="text-gray-600">Description of feature 3.</p>
                </div>
            </div>
        </section>
    )
}
export default function AboutSection() {
    return (
        <section id="about" className="py-16 bg-gray-200">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6">About</h2>
                <p className="text-gray-700">This reprository is a blank template with a Dockerise FARM tech stack.</p>
                <br/>
                <p className="text-gray-700">FARM stands for:</p>
                <ul>
                    <li className="text-gray-700">FastAPI</li>
                    <li className="text-gray-700">React</li>
                    <li className="text-gray-700">MongoDB</li>
                </ul>
                <br/>
                <p className="text-gray-700">In addition there is Mongo Express to interact with MongoDB.</p>
                <p className="text-gray-700">All is Dockerise for an easy deployment.</p>
                <p className="text-gray-700">CSS design is made with TailwindCSS.</p>
                <br/>
                <p className="text-gray-700">Feel free to use this template for demos, poc or real SAAS projects.</p>
            </div>
        </section>
    )
}
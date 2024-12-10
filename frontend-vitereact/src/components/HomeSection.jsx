export default function HomeSection() {
    return (
        <section id="home" className="h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Welcome to FARM Docker Template</h1>
                <p className="text-lg">Free and OpenSource Boilerplate to make your SAAS life peacefull ...</p>
                <p className="text-lg">Get project code on GitHub: <a href="https://github.com/ahiru-t3ch/farm-docker-template" target="_blank" rel="noopener" className="font-bold hover:underline">farm-docker-template</a>.</p>
            </div>
        </section>
    )
}
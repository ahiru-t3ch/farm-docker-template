export default function ContactSection() {
    return (
    <section id="contact" className="py-16 bg-gray-200">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-700">If you have any:</p>
            <ul>
                <li className="text-gray-700">Questions</li>
                <li className="text-gray-700">Security issue alerts</li>
                <li className="text-gray-700">Bugs to raise</li>
            </ul>
            <br/>
            <p className="text-gray-700">Feel free to ask it in the GitHub <a className="underline hover:font-bold" href="https://github.com/ahiru-t3ch/farm-docker-template/discussions">discussions</a>.</p>
            
        </div>
    </section>
    )
}
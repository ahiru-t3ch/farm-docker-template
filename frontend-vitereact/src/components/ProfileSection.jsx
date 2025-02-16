export default function ProfileSection(){

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Profile submit is clicked");
    };

    return (
        <section id="login" className="py-16 bg-gray-100">
            <div className="max-w-7xl w-full mx-auto bg-white p-8 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
                <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4 mx-auto max-w-md"
                >
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
                    >Save profile</button>
                </form>
            </div>
        </section>
    )

};
import React from "react";;

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FARM Docker Template</h3>
              <p className="text-gray-400">Thank you for using this Free and OpenSource template.</p>
              <p className="text-gray-400">Let's create a SAAS together.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Source Code on GitHub</h3>
              <p className="text-gray-400">Find project code on GitHub: <a href="https://github.com/ahiru-t3ch/farm-docker-template" target="_blank" rel="noopener" class="text-blue-400 hover:underline">farm-docker-template</a>.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">More about the author</h3>
              <p className="text-gray-400">Also on GitHub: <a href="https://github.com/ahiru-t3ch" target="_blank" rel="noopener" class="text-blue-400 hover:underline">ahiru-t3ch</a>.</p>
            </div>
          </div>
      
          <div className="border-t border-gray-700 mt-8"></div>
      
          <p className="text-center text-gray-400 text-sm mt-4">
            © 2024 My Website. Licensed under the <a href="https://github.com/ahiru-t3ch/farm-docker-template/blob/main/LICENSE" target="_blank" rel="noopener" class="text-blue-400 hover:underline">MIT License</a>.
          </p>
        </div>
      </footer>
    )
}
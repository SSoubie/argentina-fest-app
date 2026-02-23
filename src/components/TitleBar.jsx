function TitleBar() {
     return (
          <div className="fixed top-5 left-4 bg-white bg-opacity-5 backdrop-blur-sm p-4 rounded-lg shadow-lg z-50 max-w-sm">
               <h1 className="text-3xl font-bold mb-2 tracking-tight">
                    ¡Carnaval toda la vida!
               </h1>
               <h2 className="text-md italic leading-relaxed">
                    A map of the carnivals celebrated across Argentina
               </h2>
          </div>
     )
}

export default TitleBar
function Modal(props) {

  return (
    <div className="fixed inset-0 z-50 grid place-content-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">Do you know where to go next rainy February?</h2>

        <div className="mt-4">
          <p className="text-pretty text-gray-700">
            Explore the vibrant variety of carnivals celebrated across sunny Argentina, where culture, music, and tradition come alive. From the colorful parades of the Mesopotamia and the traditional corsos and batucadas of Buenos Aires to the ancestral festivities of the Quebrada de Humahuaca. Do you want to know them?
          </p>
        </div>

        <footer className="mt-6 flex justify-end gap-2">
          <button type="button" className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700" onClick={props.closeModal}>
            ¡Vamos!
          </button>
        </footer>
      </div>
    </div>
  )
}

export default Modal

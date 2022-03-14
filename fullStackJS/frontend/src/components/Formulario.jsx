import React from "react"

export const Formulario = () => {
	return (
		<>
			<p className="py-5 text-center">
				Añade tus pacientes y {""}{" "}
				<span className="text-indigo-600  font-bold">Administralos</span>
			</p>
			<form className="bg-white py-10 px-5 mb-10 lg:mb-0">
				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="text-gray-700 uppercase font-bold "
					>
						Nombre Mascota
					</label>
					<input
						type="text"
						id="mascota"
						placeholder="Nombre de la mascota"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
				<div className="mb-5">
					<label
						htmlFor="mascota"
						className="text-gray-700 uppercase font-bold "
					>
						Nombre Propietario
					</label>
					<input
						type="text"
						id="propietario"
						placeholder="Nombre del propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="email" className="text-gray-700 font-bold uppercase">
						Email del propietario
					</label>
					<input
						type="text"
						id="email"
						placeholder="Nombre del propietario"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="fecha" className="text-gray-700 font-bold uppercase">
						Fecha alta
					</label>
					<input
						type="date"
						id="fecha"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
				<div className="mb-5">
					<label htmlFor="sintomas" className="text-gray-700 font-bold uppercase">
						Sintomas
					</label>
					<input
						type="text"
						id="sintomas"
            placeholder="Describe los sintomas"
						className="border-2 w-full p-2 mt-2 placeholder-gray-400"
					/>
				</div>
        <input type="submit"
        className="bg-indigo-600 w-full p-3 text-white" value="Agregar Pacientes" />
			</form>
		</>
	)
}

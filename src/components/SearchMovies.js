import React, { useEffect, useState } from 'react';

function SearchMovies() {

	// estado movies con un array vacío como valor inicial
	const [movies, setMovies] = useState([])

	// palabra para buscar en el titulo
	const [keyword, setKeyword] = useState(null)

	// captura error al llamar a la api
	const [error, setError] = useState(null)

	// hacer un llamado asincrónico a la API
	useEffect(() => {
		const updateMovies = async () => {
			try {
				const api = `https://www.omdbapi.com/?i=tt3896198&apikey=cd0f2221&s=${keyword}`
				const data = await fetch(api)
				const { Search } = await data.json()
				setMovies(Search)
				setError(null)
			} catch (error) {
				setError(error)
			}
		}
		updateMovies()
	}, [keyword])

	// Credenciales de API
	const apiKey = 'X'; // Intenta poner cualquier cosa antes para probar

	return (
		<div className="container-fluid">
			{
				error || apiKey !== '' ?
					<>
						<div className="row my-4">
							<div className="col-12 col-md-6">
								{/* Buscador */}
								<form method="GET">
									<div className="form-group">
										<label htmlFor="">Buscar por título:</label>
										<input type="text" className="form-control" />
									</div>
									<button className="btn btn-info">Search</button>
								</form>
							</div>
						</div>
						<div className="row">
							<div className="col-12">
								<h2>Películas para la palabra: {keyword}</h2>
							</div>
							{/* Listado de películas */}
							{
								movies.length > 0 && movies.map((movie, i) => {
									return (
										<div className="col-sm-6 col-md-3 my-4" key={i}>
											<div className="card shadow mb-4">
												<div className="card-header py-3">
													<h5 className="m-0 font-weight-bold text-gray-800">{movie.Title}</h5>
												</div>
												<div className="card-body">
													<div className="text-center">
														<img
															className="img-fluid px-3 px-sm-4 mt-3 mb-4"
															src={movie.Poster}
															alt={movie.Title}
															style={{ width: '90%', height: '400px', objectFit: 'cover' }}
														/>
													</div>
													<p>{movie.Year}</p>
												</div>
											</div>
										</div>
									)
								})
							}
						</div>
						{movies.length === 0 && <div className="alert alert-warning text-center">No se encontraron películas</div>}
					</>
					:
					<div className="alert alert-danger text-center my-4 fs-2">Eyyyy... ¿PUSISTE TU APIKEY?</div>
			}
		</div>
	)
}

export default SearchMovies;

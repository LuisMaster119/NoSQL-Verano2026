### Crea el flujo e interaccion Cliente-Servidor para un CRUD b'asico de una tienda de peliculas

# Método HTTP: POST
# URI: /peliculas
# JSON enviado:
{
  "nombre": "Un loco viaje al pasado",
  "director": "Steve Pink",
  "anio": 2010,
  "duracion": 101,
  "genero": "Comedia"
}
# JSON recibido:
{
  "code": 201,
  "msg": "Pelicula creada",
  "id": 119
}

# Método HTTP: GET
# URI: /peliculas/119
# No hay JSON de envio, el id esta en la uri
# JSON recibido:
{
  "id": 119,
  "nombre": "Un loco viaje al pasado",
  "director": "Steve Pink",
  "anio": 2010,
  "duracion": 101,
  "genero": "Comedia"
}

# Método HTTP: PUT
# URI: /peliculas/119
# JSON enviado:
{
  "director": "Jesse Pink",
  "anio": 2010,
  "duracion": 120
}
# JSON recibido:
{
  "code": 200,
  "msg": "Pelicula Actualizada"
}

# Método HTTP: DELETE
# URI: /peliculas/119
# (sin JSON enviado, el id va en la URL)
# JSON recibido:
{
  "code": 200,
  "msg": "Pelicula Eliminada"
}
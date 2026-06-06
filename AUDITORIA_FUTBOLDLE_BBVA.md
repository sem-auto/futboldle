# Auditoria Futboldle BBVA

## Trayectorias corregidas

- Nilmar: eliminada la trayectoria falsa hacia Valencia. Ahora se usa Internacional, Villarreal y Santos.
- Benat: corregida su base para reflejar Betis y Athletic Club.
- El modo Trayectoria ya no usa cualquier jugador de la base general. Usa un pool auditado de 32 jugadores con:
  - Primer club relevante
  - Club mas conocido
  - Ultimo club relevante
  - Posicion
  - Nacionalidad
- Se evita usar solo club inicial y club final para no crear pistas imposibles.

## Top10 corregidos

Los Top10 activos quedan limitados a rankings objetivos con una unica fuente por reto:

- Top goleadores LaLiga 2015/16
  - Fuente: StatBunker
  - URL: https://www.statbunker.com/competitions/TopGoalScorers?comp_id=518
- Top asistencias LaLiga 2015/16
  - Fuente: StatBunker
  - URL: https://www.statbunker.com/competitions/MostAssists?comp_id=518
- Top asistencias LaLiga 2012/13
  - Fuente: StatBunker
  - URL: https://www.statbunker.com/competitions/MostAssists?comp_id=413
- Top porterias a cero LaLiga 2015/16
  - Fuente: StatBunker
  - URL: https://www.statbunker.com/competitions/Top10KeepersCleanSheets?comp_id=518

## Tops no verificables retirados

Se mantienen fuera de la rotacion activa los rankings acumulados o de club que no estaban respaldados por una unica fuente cerrada en el proyecto:

- Maximos goleadores BBVA 2005/06-2015/16 acumulado
- Maximos goleadores espanoles BBVA acumulado
- Mas partidos Valencia era BBVA
- Mas partidos Atletico era BBVA
- Mas partidos Sevilla era BBVA
- Mas partidos Villarreal era BBVA

## Datos erroneos encontrados

- Nilmar aparecia con Valencia como club final. Es incorrecto.
- Benat no estaba representado con Betis, etapa clave para sus pistas.
- El perfil leia estadisticas globales, pero varios juegos solo actualizaban contadores propios.

## Estadisticas reparadas

- Wordle, Trayectoria, Top10 y Adivina el Crack registran partidas jugadas, victorias, derrotas y racha.
- Los contadores especificos de Top10, Top20, Wordle, Trayectoria y Crack se mantienen.
- El perfil muestra ahora victorias reales, derrotas, porcentaje, rachas y datos de coleccion.

## Jugadores anadidos

- Morales
- Iborra
- Diego Castro
- Mikel Rico

Ya estaban incluidos o representados en la base:

- Ruben Castro
- Bruno Soriano
- Valeron
- Senna
- Barral
- Apono
- Coke
- Benat

## Validaciones automaticas

- Todos los jugadores de Top10 activos existen en la base global.
- Todos los jugadores del pool auditado de Trayectoria existen en la base global.

## Pendiente

- Verificacion exhaustiva linea por linea de todos los clubes de todos los jugadores de la base general contra Transfermarkt.
- Reactivar rankings acumulados historicos solo cuando exista una fuente unica verificable para todo el periodo.
- Fotos reales de jugadores solo deberian anadirse cuando haya una fuente local/licenciada clara.

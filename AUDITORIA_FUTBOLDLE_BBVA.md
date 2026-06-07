# Auditoria Futboldle BBVA

## Trayectorias corregidas

- Nilmar: eliminada la trayectoria falsa hacia Valencia. Ahora se usa Internacional, Villarreal y Santos.
- Benat: corregida su base para reflejar Betis y Athletic Club.
- Gameiro: actualizado para la regla beta de carrera reconocible como Sevilla, Atletico, Valencia y Lorient.
- Valeron: eliminado Malaga, club incorrecto para su trayectoria.
- Barral: corregido como David Barral, con Sporting, Levante y Granada.
- El modo Trayectoria ya no usa cualquier jugador de la base general. Usa `src/data/trayectoriaAudit.ts`, un pool beta de 144 jugadores con:
  - Club principal
  - Segundo club
  - Tercer club si existe
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

## Tops solicitados pendientes

Se anadio una cola interna `pendingRequestedTops` para los Top10 de beta que faltan por auditar manualmente. No se activan hasta tener fuente, temporada, estadistica exacta y ranking completo.

## Datos erroneos encontrados

- Nilmar aparecia con Valencia como club final. Es incorrecto.
- Benat no estaba representado con Betis, etapa clave para sus pistas.
- Barral estaba representado como Adrian Barral y con clubes incorrectos.
- Valeron aparecia con Malaga, club incorrecto.
- Varios cromos mezclaban clubes posteriores al periodo base 2005-2016.
- El perfil leia estadisticas globales, pero varios juegos solo actualizaban contadores propios.

## Estadisticas reparadas

- Wordle, Trayectoria, Top10 y Adivina el Crack registran partidas jugadas, victorias, derrotas y racha.
- Los contadores especificos de Top10, Top20, Wordle, Trayectoria y Crack se mantienen.
- El perfil muestra ahora victorias reales, derrotas, porcentaje, rachas y datos de coleccion.
- Home refresca las estadisticas al volver desde un juego y lee `fbl-stats-v1`.
- Se mantienen las claves reales: `fbl-stats-v1`, `fbl-game-counts-v1`, `fbl-day-YYYY-MM-DD` y `fbl-album-unlocked-v1`.

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
- Creada `/admin/audit` para revisar jugadores, cromos bloqueados/desbloqueados, Trayectorias, Top10, fuentes, estadisticas y localStorage.
- La auditoria muestra tambien Top10 pendientes solicitados y trayectorias excluidas.
- Eliminados duplicados innecesarios de Agirretxe, Carlos Vela, Ibai Gomez y Nolito.
- Validacion beta: 214 jugadores, 144 trayectorias auditadas, 0 jugadores Top10 huerfanos, 0 displayNames duplicados.

## Pendiente

- Verificacion exhaustiva linea por linea de todos los clubes secundarios de todos los jugadores de la base general contra Transfermarkt.
- Reactivar rankings acumulados historicos solo cuando exista una fuente unica verificable para todo el periodo.
- Fotos reales de jugadores solo deberian anadirse cuando haya una fuente local/licenciada clara.

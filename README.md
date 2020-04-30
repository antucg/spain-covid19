## España Covid-19

Este proyecto ha sido desarrollado con la idea de mostrar el estado actual de contagios en las distintas provincias 
del territorio español. La idea surge de un mapa similar de la provincia China de Hubei.

Conforme el número de nuevos casos detectactos descienda, cada provincia irá cambiando de color. Cada color representa 
una cantidad de casos diagnosticados en los últimos 14 días.

Para cualquier duda o sugerencia con respecto a este proyecto, pueden contactarme a través de este email: 
[antucg@gmail.com](antucg@gmail.com).

### Actualización de los datos

Los datos mostrados se obtienen del siguiente repositorio: [Escovid19data](https://github.com/montera34/escovid19data). 

Estos se actualizan periódicamente (yo no formo parte de dicho proyecto). Cualquier discrepancia que se pueda detectar 
con respecto a los datos oficiales pueden ser comunicados a traves de este email: 
[covid19@montera34.com](covid19@montera34.com)

### Algoritmo utilizado

Dado que los datos de cada provincia pueden ser actualizados en días diferentes, he tomado la decisión de utilizar los 
últimos 14 días desde el momento en el que se visualiza la web. Si una determinada provincia no ha sido actualizada en 
el último día, el dato de infectados para este día en concreto será contabilizado como 0.  

### Colores

* Rojo: 50 casos o más diagnosticados en los últimos 14 días.
* Amarillo: Entre 0 y 50 casos diagnosticados en los últimos 14 días.
* Verde: 0 casos detectados en los últimos 14 días.
* Negro: datos no disponibles.

### Fuente de datos

[Escovid19data](https://github.com/montera34/escovid19data)

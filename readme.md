### Gestión de pagos bancarios

> Crear nuevos pagos
> Ver la lista de pagos realizados
> Búsquedas y filtrado segund diferentes criterios

API RESTful para realizar operaciones CRUD

Tecnologias:
NodeJS
Express
PostgreSQL
Docker
React

## Implementar Autenticación

    - JWT ✅
    - Inicio de Sesion ✅

Interfaz de usuario que permita:

## Registrar nuevos pagos

    - Monto ✅
    - Fecha ✅
    - Tipo (Debito / Credito / Efectivo) ✅
    - Destino (Usuario) ✅

## Lista de pagos que permita filtrar por

    - Fecha -> Mas Nuevo y Mas Viejo ✅
    - Monto -> Menor y Manyor ✅
    - Tipo de pago -> Debito , Credito o Efectivo ✅
    - Hacer un Search en la lista para buscar palabras claves de un campo ✅

### Puntos Adicionales:

    - Implementar pruebas basicas a la API
    - Usar Styled component y Tailwind CSS ✅
    - Validacion en input del backend(JOI) ✅
    - Exportar la LISTA de pagos en un CSV o EXCEL ✅

Guias:
https://medium.com/@miriamnavamucino/conectar-docker-y-postgres-con-node-js-cbaea3934835
https://medium.com/how-to-react/how-to-add-export-to-csv-button-in-react-table-7e77ce93838b
Frontend:
gestion-de-pagos-almendra.vercel.app

### ENDPOINT BACKEND

## Todos estos endpoint fue probado con postamn y pasaron las pruebas

- /api/payment/create

- /api/payment/list

- /api/payment/filter?dateFilter=lessNow
- /api/payment/filter?dateFilter=lessNow
- /api/payment/filter?amount=more
- /api/payment/filter?amount=less
- /api/payment/filter?typePayment=credit
- /api/payment/filter?typePayment=debit
- /api/payment/filter?typePayment=cash

- /api/user/login
- /api/user/register

> Cosas a mejorar: Independizar cada parte que hace el componente para hacer que el mantenimiento sea sostenible, no lo hice por que nose hasta cuando tengo tiempo de entregar

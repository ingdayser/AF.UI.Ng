# AF.UI.Ng

Librerías de front compartidas de **Apoyo Financiero (AF)**: lo que el SPA Angular y la app móvil (Angular Native)
tienen en común sobre préstamos, clientes, pagos y parámetros. Lo transversal a todas las apps de Apoyos
Tecnológicos vive en `AT.UI.Ng` (`@at/*`), de lo que este repo depende.

## Paquetes

| Paquete | Qué contiene | Depende de |
|---|---|---|
| `@af/ui-models` | TypeScript puro: DTOs y requests de la Core API (`LoanDto`, `Customer`, `AccountDto`, pagos, cobro jurídico, acuerdos de pago, parámetros...), `LoanStatusCode` con etiquetas y tonos, reglas puras (`nextQuota`, `overdueQuotas`, `totalOverdue`, `isFullyPaid`), `customerFullName`, `customerSearchQuery` | nada |
| `@af/ui-api` | Clientes de la Core API sobre `BaseHttpService`: `LoanApi`, `CustomerApi`, `PersonalReferenceApi`, `AccountApi`, `PaymentTypeApi`, `RateApi`, `LoanTypeApi`, `LoanStatusApi`, `QuotaStatusApi`, `SupplierApi`, `DocumentTypeApi`, `PaymentCalendarApi` | `@af/ui-models`; peers `@at/ui-core`, `@at/ui-http`, `@angular/core`, `rxjs` |

Cada app aporta la URL de la Core API y usa los clientes por token (sin decoradores, como `@at/*`):

```ts
providers: [{ provide: AF_API_CONFIG, useValue: { coreApiUrl: `${host}/api/v1.0` } }]

private readonly loans = inject(LOAN_API);
this.loans.registerPayment(loanId, { amount, accountId, paymentDate });
```

Los métodos de las llamadas que se disparan mientras el usuario escribe (`search`, `getMoraPreview`) son silenciosos: no
muestran el indicador de carga global.

## Reglas

- **Solo dominio de AF**: lo que no dependa de préstamos, clientes o pagos va en `AT.UI.Ng`.
- Los DTOs reflejan las respuestas reales de la API (tomadas del SPA, no de los contratos OpenAPI, que no describen respuestas).
- Sin DOM, sin `localStorage`, sin módulos nativos. Compatible con Hermes (React Native).
- Las clases de los clientes no llevan decoradores: se crean con `new` dentro de un `InjectionToken` con `providedIn: 'root'`.
- Imports relativos con extensión `.ts`.

## Comandos

```sh
npm install      # necesita acceso al feed de @at/* (vsts-npm-auth -config .npmrc)
npm run typecheck && npm run lint && npm test && npm run build
```

## Publicación

Igual que `AT.UI.Ng`: feed `ApoyosTecnologicos` de Azure Artifacts, `.npmrc` sin credenciales, versión nueva por cada
publicación (`npm version patch -w @af/ui-models -w @af/ui-api`) y `azure-pipelines.yml` que publica al empujar un tag `v*`.

## Pendiente

- Mensajes de WhatsApp (mora, recordatorio, confirmación de pago): hoy duplicados en el SPA entre `WhatsAppMessageService` y los
  `*ParamsBuilder`, con reglas distintas (p. ej. total en mora). Hay que unificarlos antes de moverlos aquí.
- Descarga del pagaré (`Blob`) y calendario como `httpResource`: dependen del SPA; se quedan allá.
- `package-lock.json`: se genera con `npm install` contra el feed.

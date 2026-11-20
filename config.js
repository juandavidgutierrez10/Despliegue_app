/*
 * CONFIGURACIÓN DE LA APP · Despliegue de Aplicaciones Web (2º DAW)
 * -----------------------------------------------------------------
 * Este es el único archivo que necesitas tocar en el día a día.
 *
 * Estado de cada unidad:
 *   "repaso"    -> abierta, marcada como repaso
 *   "actual"    -> abierta y destacada como la unidad que estamos dando
 *   "bloqueada" -> solo se ve el título; su contenido no se carga
 *
 * Para abrir una unidad nueva: cambia su estado a "actual" (y la anterior a "repaso"),
 * guarda, haz commit y push. GitHub Pages la publica en un minuto.
 */
window.CONFIG = {
  curso: "2026-2027",
  centro: "IES D. Antonio Hellín Costa",

  // Modo Pro: cuando esté listo, poner a true para que aparezca el interruptor.
  modoPro: false,

  unidades: [
    { id: "ut1", num: 1, titulo: "Documentación, control de versiones e integración continua", ra: "RA6", sesiones: 12, estado: "repaso" },
    { id: "ut2", num: 2, titulo: "Virtualización y contenedores", ra: "RA1", sesiones: 7, estado: "repaso" },
    { id: "ut3", num: 3, titulo: "Arquitectura web y fundamentos del despliegue", ra: "RA1", sesiones: 13, estado: "actual" },
    { id: "ut4", num: 4, titulo: "Despliegue de aplicaciones en servidores web", ra: "RA2", sesiones: 12, estado: "bloqueada" },
    { id: "ut5", num: 5, titulo: "Servidores de transferencia de archivos", ra: "RA4", sesiones: 12, estado: "bloqueada" },
    { id: "ut6", num: 6, titulo: "Servicios de red: DNS y LDAP", ra: "RA5", sesiones: 8, estado: "bloqueada" },
    { id: "ut7", num: 7, titulo: "Despliegue en servidores de aplicaciones", ra: "RA3", sesiones: 16, estado: "bloqueada" }
  ]
};

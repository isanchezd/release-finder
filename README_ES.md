# Release finder

Este repositorio contiene el codigo fuente de la aplicacion web Release Finder.

Este proyecto es una aplicacion web cuya finalidad es la de realizar operaciones de busqueda avanzada sobre releases generadas sobre repositorios de git en github.

La necesidad de este proyecto nace a partir de dos objetivos fundalmentales

1. Encontre una necesidad personal de tener que buscar en diferentes releases si habia habido algun cambio sobre un problema que me encontraba con la actual version de una herramienta. Me llevo tiempo poder realizar dicha busqueda y eche en falta un buscador mas avanzado

2. Mi afan personal de estar cacharreando y probando diferentes tecnologias hizo que me apeteciese probar a hacer algo con [svelte](https://svelte.dev/) y un poco de su ecosistema.

## Construido con

- [SvelteKit](https://kit.svelte.dev/)
- [Sveltestrap](https://sveltestrap.js.org/?path=/docs/sveltestrap-overview--docs)

## Prerequisitos

Para instalar el projecto y correrlo se necesita tener instalado [Node.js](https://nodejs.org/).

## Instalacion

Una vez tengas correctamente instalado Node.js ejecuta el siguiente comando:

```bash
npm install
```

Este comando instalara todos los paquetes necesarios para poder trabajar con el repositorio.

## Desarrollo

Una vez hayas instalado todas las dependencias del proyecto para poder levantar el proyecto ejecuta el siguiente comando:

```bash
npm run dev
```

## Construccion

Para poder construir una `build` para entornos productivos ejecutaremos el siguiente comando:

```bash
npm run build
```

Para poder probar la aplicacion desde la `build` que hemos generado ejecutaremos el siguiente comando:

```bash
npm run preview
```

## Revision de errores

Para poder revisar si hay algun error en nuestro codigo podemos ejecutar el siguiente comando:

```bash
npm run check

## O si queremos en modo watch

npm run check:watch
```

## Formateo & Linteo

Para poder revisar si el codigo cumple con las reglas de linteo definidas ejecutamos el siguiente comando:

```bash
npm run lint
```

Para formatear el codigo acorde a las reglas definidas ejecutamos el siguiente comando:

```bash
npm run format
```

## Testing

Para ejecutar la bateria de test, tanto e2e como unitarios ejecutaremos el siguiente comando:

```bash
npm run test
```

Si queremos ejecutar solo los unitarios:

```bash
npm run test:unit
```

Si queremos ejecutar solo los e2e:

```bash
npm run test:e2e
```

## Contributing

Si tu tienes alguna sugerencia sobre como hacer este proyecto mejor, por favor forkeate el repositorio y create una PR. No olvides darle una estrella =)

1. Forkeate el proyecto
2. Create una rama (`git checkout -b feature/AmazingFeature`)
3. Comitea los cambios(`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre una PR

## License

Distributed under the GPL3 License. See `LICENSE.txt` for more information.

## Contact

- isanchezd -(Iván Sánchez Díaz)[mailto:sanchez.diaz.ivan@gmail.com]

# APP Centro Veterinario Berazategui 1.0

La APP cuenta con pantallas de login, registro y su ubicacion
-Una vez realizado el ingreso la primer vista es un feed de las historias de instagram, con esto logramos que la app se mantena actualizada
-De una manera sencilla el administrador que ya crea las publicaciones dia a dia puede mostrarlas en la app
-Cuenta con un sistema de carrito de compras que permite visualizar cantidades de cada producto y eliminarlos, de ser necesaraio, antes de concretar la compra.
-Guarda los pedidos en linea con fecha y hora
-Gestiona direccion del usuario como tambien una imagen de perfil

### Pre-requisitos 📋

Para que funcione debera transcribir las keys que envie por mensaje privado en el archivo

```
src\databases\systemData.js
```

### Dependencias 🔧

Detallamos las dependencias y los usos
La app fue creada lcon la base de React Native Expo 51.0.22, y con algunas dependencias extras

- "expo-file-system": "~17.0.1" => Para el manejo de los archivos dentro del dispositivo, guardar datos en general
- "expo-font": "~12.0.9" => Para la visualizsacion de las fuentes que no son predeterminadas
- "expo-sqlite": "~14.0.5"=>Para guardar los datos del login
- "expo-image-picker": "~15.0.7"=> PAra trabajar con las imagenes de la camara o galeria en el perfil
- "react-native-maps": "1.14.0"=>PAra mostrar la ubicacion del Local
- "expo-location": "~17.0.1"=> Para mostrar la ubicacion y guardarla en el perfil de usuario
- "react-native-safe-area-context": "4.10.5" => Para agrupar toda la app en una zona la pantalla acorde a cada dispositivo
- "react-redux": "^9.1.2"=> PAra manejar estados globales
- "yup": "^1.4.0" => valida los labels del registro de usuario
- "stack": "^0.1.0"=> Para navegacion
- "@react-navigation/bottom-tabs": "^6.6.1" => Para navegacion

## Falta resolver ⚙️

- La APP al instalarla el APK en un celular da un error de manejo del sqlite, no lo pude resolver.
- La fecha de las ordenes las transforme en numero para cuando la recupere en el contenedor las pueda ordenar, pero no llegue con el tiempo.
- Quedo por terminar de generar Subcategorias, no llegue con el tiempo.

## Final 🍺

Agradecimientos a los profes/tutores que ayudaron a crear esta app de prueba!

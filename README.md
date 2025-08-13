<p align="center"> <img src="src/assets/icon.png" alt="Mandarino logo" width="128" height="128"> </p> <h1 align="center">MANDARINO</h1> <p align="center">“Exprime tus crypto, saborea la ganancia”</p>

---

## Aplicación React Native CLI

- **Login con Google**

- **Home** inicial

- **Listado de cryptos** con búsqueda, paginado, orden y refresh (CoinGecko)

- **Exchange crypto ↔ fiat** en tiempo real

- **Scanner de wallets (QR)**&#x20;

- **Historial** de QRs escaneados y Favoritos

**Stack:** React Native CLI + TypeScript • React Navigation • react-native-actions-sheet • react-native-vision-camera •react-native-keychain • react-native-google-signin/google-signin • AsyncStorage • react-native-linear-gradient • @react-native-community/blur

---

## Arquitectura

El proyecto sigue una **Feature Architecture**, organizando cada funcionalidad principal dentro de su propio módulo (`src/features/`) con sus componentes, estilos y lógica. Los elementos compartidos (componentes, hooks, servicios, utilidades) están desacoplados para favorecer la escalabilidad y mantenibilidad.

---

## Seguridad

Las credenciales y tokens se guardan de forma segura con **`react-native-keychain`**:

- **iOS:** Keychain Services
- **Android:** Android Keystore (EncryptedSharedPreferences)

Esto evita almacenar información sensible en texto plano.

---

## Variables de entorno

Se incluye un archivo `.env.template` con las siguientes variables **(todas obligatorias)**:

```
COINGECKO_API_KEY=
WEB_CLIENT_ID=
IOS_CLIENT_ID=
```

---

## Requisitos

- macOS 15.5 (arm64)
- Node 18.20.5 • Yarn 1.22.22
- React Native 0.80.2 (CLI 19.1.1)
- **JDK 17** (recomendado)
- Android SDK 35 (minSdk 24)
- iOS: Xcode 16.4, iOS 15.1+, CocoaPods 1.13.0

Para Android (JDK 17):

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"
```

---

## Instalación

```bash
# 1) Clonar
git clone https://github.com/TommStark/mandarino.git
cd mandarino

# 2) Instalar dependencias
yarn install

# 3) Copiar .env
cp .env.template .env

# 4) iOS pods
cd ios && pod install && cd ..

# 5) Levantar
yarn start        # en una terminal
yarn android      # para android
yarn ios.         # para iOS
```

---

## Notas

- En iOS Simulator no hay cámara física: se incluye fallback (QR de prueba).

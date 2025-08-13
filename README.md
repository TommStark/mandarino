# Mandarino — Mobile Challenge

Aplicación **React Native CLI**

- **Login con Google**
- **Listado de cryptos** con búsqueda, paginado, orden y refresh (CoinGecko)
- **Exchange crypto ↔ fiat** en tiempo real
- **Scanner de wallets (QR)** con historial y favoritos

> Stack: React Native CLI + TypeScript • React Navigation • react-native-actions-sheet • react-native-vision-camera • react-native-google-signin/google-signin • AsyncStorage • react-native-linear-gradient • @react-native-community/blur

---

## 1) Requisitos

**Identificadores (confirmado)**

- **Android `applicationId`**: `com.mandarino`
- **iOS `PRODUCT_BUNDLE_IDENTIFIER`**: `com.mandarino`

- **SO**: macOS 15.5 (arm64)
- **Node**: 18.20.5
- **npm / Yarn**: 10.8.2 / 1.22.22
- **React Native**: 0.80.2 (CLI 19.1.1)
- **Java JDK**: **17** recomendado para build (compatibilidad con AGP 8.x / Gradle 8.x)
- **Android**: SDK 35 (compile/target), minSdk 24
- **iOS**: Xcode 16.4, Swift 6.1.2, CocoaPods 1.13.0, iOS 15.1+

**Usar JDK 17** para compilar Android:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"
java -version  # debe mostrar 17
```

---

## 2) Clonado e instalación

```bash
# 1) Clonar
git clone https://github.com/TommStark/mandarino.git
cd mandarino

# 2) Instalar dependencias
yarn install

# 3) Copiar el .env provisto (raíz del proyecto)
cp /ruta/a/tu/.env ./.env   # o crea uno desde .env.example

# 4) iOS: instalar pods
cd ios && pod install && cd ..
```

### Quickstart para reviewers (5 minutos)

**Android**

```bash
# (Recomendado) usar JDK 17
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"

# Arrancar Metro
yarn start

# Nueva terminal → compilar y ejecutar en emulador/dispositivo
yarn android
```

**iOS**

```bash
# Arrancar Metro
yarn start

# Nueva terminal → iOS (simulador por defecto)
yarn ios
# o desde Xcode: abrir ios/Mandarino.xcworkspace y Run (Debug)
```

⚠️ Copia el **.env provisto** en la raíz **antes** de probar el login con Google.

---

## 3) Configuración (.env y Google Sign‑In)

Para evaluar el proyecto, **solo copiar el `.env` provisto** en la raíz. No se requieren pasos adicionales.

- **Android**: no se usa Firebase ni `google-services.json`. El login usa `@react-native-google-signin/google-signin` con Web Client ID desde `.env`.
- **iOS**: `CFBundleURLSchemes` y `NSCameraUsageDescription` ya están configurados en `Info.plist`. El Bundle ID es `com.mandarino`.

Si en el futuro se rotan credenciales, actualizar el `.env` y (en iOS) el `CFBundleURLSchemes` con el reversed client id correspondiente.

---

## 4) Configuración: Cámara / QR (react-native-vision-camera)

### Permisos

**iOS (`ios/<App>/Info.plist`)**

```xml
<key>NSCameraUsageDescription</key>
<string>Necesitamos acceso a la cámara para escanear códigos QR.</string>
```

**Android (`android/app/src/main/AndroidManifest.xml`)**

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### Instalación

La librería se autolinka. Tras `yarn install`, corre `cd ios && pod install`. En Android no requiere pasos extra. En iOS Simulator **no hay cámara**: se provee fallback (pegar desde portapapeles / QR de prueba / ingreso manual).

---

## 5) UI y Navegación

- **React Navigation** (Stack + Bottom Tabs)
- **react-native-actions-sheet** para selectores (cripto/fiat)
- **Gesture Handler & Reanimated** ya configurados.

Babel incluye el plugin de Reanimated:

`babel.config.js`

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

- Fondo visual con **LinearGradient**, blobs y **BlurView**.

---

## 6) Datos en tiempo real (CoinGecko)

- `fetchCoinsMarkets` para listado con paginado, búsqueda, orden y variación 24h
- `fetchExchangeRate` para conversiones en Exchange (crypto ↔ fiat)
- Estrategia: refresh manual y revalidación al enfocar pantalla

> CoinGecko permite endpoints públicos; la API key es **opcional** y mejora límites de rate. Las claves se gestionan con **react-native-config**.

---

## 7) Scripts

```json
{
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "start": "react-native start",
  "lint": "eslint .",
  "test": "jest"
}
```

### Librerías principales (versiones)

- @react-navigation/native **7.1.17** + native-stack **7.3.24** + bottom-tabs **7.4.5**
- **react-native-actions-sheet 0.9.7**
- @react-native-google-signin/google-signin **15.0.0**
- react-native-vision-camera **4.7.1**
- react-native-reanimated **4.0.1** • react-native-gesture-handler **2.28.0** • react-native-screens **4.13.1**
- react-native-linear-gradient **2.8.3** • @react-native-community/blur **4.4.1**
- react-native-paper **5.14.5**
- @react-native-async-storage/async-storage **2.2.0**
- @tanstack/react-query **5.84.1** • axios **1.11.0**
- react-native-config **1.5.6** (manejo de `.env`)
- Otras: clipboard, svg (+ transformer), vector-icons, actions-sheet, bootsplash, skeleton-placeholder, sound, worklets

---

## 8) Estructura (resumen)

```
src/
  components/
  screens/
  hooks/
  context/
  services/
  utils/
  navigation/
```

---

## 9) Funcionalidades

- **Login con Google** (sin Expo ni Firebase, mediante `@react-native-google-signin/google-signin`).
- **Listado de criptomonedas**: búsqueda, paginado, orden asc/desc, variación 24h y refresh.
- **Exchange crypto ↔ fiat**: selección de crypto y fiat, conversión bidireccional, tasa de referencia.
- **Scanner de wallets (QR)**: lectura con cámara, historial local y favoritos; _fallback_ para iOS Simulator.

---

## 10) Calidad de código y buenas prácticas

- **TypeScript** en todo el código
- Componentes **presentacionales vs. contenedores**
- Hooks para separar efectos/queries (`useExchangeRate`, `useScannedWallets`)
- **FlatList** con `keyExtractor`, `getItemLayout` cuando aplica, `removeClippedSubviews`
- **Estado de red**: loading / error por pantalla y por componente
- **Persistencia**: AsyncStorage para preferencias e historial de QR
- **Accesibilidad**: labels, tamaños táctiles ≥ 44x44

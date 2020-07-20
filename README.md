# RNNBBase

#### 介绍
react-native app开发全家桶

#### 软件架构
使用typescript开发，需要进行必要的typescript配置，可参照如下配置：

tsconfig.json

`
{
    "compilerOptions": {
        "allowJs": true,
        "allowSyntheticDefaultImports": true,
        "experimentalDecorators": true,
        "esModuleInterop": true,
        "isolatedModules": true,
        "jsx": "react",
        "lib": [
            "es6"
        ],
        "moduleResolution": "node",
        "noEmit": true,
        "strict": true,
        "target": "esnext",
        "baseUrl": "src",
        "paths": {
            "*": [
                "src/*"
            ],
            "@components/*": [
                "src/components/*"
            ],
            "@apis/*": [
                "src/apis/*"
            ],
        }
    },
    "exclude": [
        "node_modules",
        "babel.config.js",
        "metro.config.js",
        "jest.config.js"
    ]
}
`

建议react-native初始化工程使用typescript模版：
`npx react-native init MyApp --template react-native-template-typescript`

推荐使用mobx作为状态管理器：
`yarn add mobx mobx-react`

#### 安装教程

1、`yarn add react-native-nbbase` 或者 `npm install react-native-nbbase --save`

2、需要集成以下包：
    `yarn add react-native-amap-geolocation react-native-gesture-handler react-native-puti-pay react-native-reanimated react-native-screens react-native-sqlite-storage react-native-svg react-native-vector-icons @react-native-community/async-storage @react-native-community/masked-view @react-native-community/netinfo @react-navigation/native @react-navigation/stack axios native-base lottie-react-native`
    
3、使用的react和react-native版本：
    `"react": "16.11.0"` `"react-native": "0.62.2"`

#### 集成说明

1.  集成MQTT
    android  添加生命：`<service android:name="org.eclipse.paho.android.service.MqttService" />`


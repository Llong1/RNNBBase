package cn.yupute.react

import cn.yupute.react.mqtt.*
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class NBBasePackage :ReactPackage{
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(NBBaseMQTTModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf()
    }
}
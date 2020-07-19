package cn.yupute.react.mqtt

import android.content.Context;
import android.content.Intent;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Build;
import android.os.Handler;
import android.os.IBinder;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import android.util.Log;
import android.widget.Toast;

import org.eclipse.paho.android.service.MqttAndroidClient;
import org.eclipse.paho.client.mqttv3.IMqttActionListener;
import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.IMqttToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule

class NBBaseMQTTModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        var clientMaps: MutableMap<String, MqttAndroidClient> = mutableMapOf();
    }

    var errorInvalidClient: String = "E_NBMQTT_ERROR_INC";
    var errorNativeException: String = "E_NBMQTT_ERROR_NTE";
    
    override fun getName(): String {
        return "NBBaseMQTTModule"
    }

    @ReactMethod
    fun isConnected(serverUri: String, clientId: String, promise: Promise) {
        var clientKey = "$serverUri,$clientId";
        if(NBBaseMQTTModule.clientMaps.containsKey(clientKey)) {
            var client: MqttAndroidClient = NBBaseMQTTModule.clientMaps[clientKey]!!;
            try {
                promise.resolve(client.isConnected());
            } catch (e: MqttException) {
                e.printStackTrace();
                promise.reject(errorNativeException, e);
            }
        } else {
            promise.resolve(false);
        }
    }

    @ReactMethod
    fun connectServer(serverUri: String, clientId: String, options: ReadableMap, promise: Promise?) {
        var clientKey = "$serverUri,$clientId";
        var client: MqttAndroidClient?;
        if(NBBaseMQTTModule.clientMaps.containsKey(clientKey)) {
            client = NBBaseMQTTModule.clientMaps[clientKey];
        } else {
            client = MqttAndroidClient(this.reactContext, serverUri, clientId);
            client.setCallback(InnterMqttCallback(serverUri, clientId, options, this));
            NBBaseMQTTModule.clientMaps[clientKey] = client;
        }
        var options1: MqttConnectOptions = MqttConnectOptions();
        if(options.hasKey("cleanSession")) {
            options1.setCleanSession(options.getBoolean("cleanSession"));
        }
        if(options.hasKey("connectionTimeout")) {
            options1.setConnectionTimeout(options.getInt("connectionTimeout"));
        } else {
            options1.setConnectionTimeout(10);
        }

        var keepAliveInterval: Int = 20;
        if(options.hasKey("keepAliveInterval")) {
            keepAliveInterval = options.getInt("keepAliveInterval");
        }
        options1.setKeepAliveInterval(keepAliveInterval);

        if(options.hasKey("userName")) {
            options1.setUserName(options.getString("userName"));
        }

        if(options.hasKey("password")) {
            options1.setPassword(options.getString("password")!!.toCharArray());
        }

        if(!client!!.isConnected()) {
            try {
                client.connect(options1, null, InnterIMqttActionListener(serverUri, clientId, options, this));
                if(promise != null) {
                    promise.resolve(true);
                }
            } catch(e: MqttException) {
                e.printStackTrace();
                if(promise != null) {
                    promise.reject(errorNativeException, e);
                }
            }
        } else {
            if(promise != null) {
                promise.resolve(true);
            }
        }
    }

    @ReactMethod
    fun publish(serverUri: String, clientId: String, topic: String, msg: String, qos: Int, retained: Boolean, promise: Promise) {
        var clientKey = "$serverUri,$clientId";
        if(NBBaseMQTTModule.clientMaps.containsKey(clientKey)) {
            var client: MqttAndroidClient = NBBaseMQTTModule.clientMaps[clientKey]!!;
            try {
                client.publish(topic, msg.toByteArray(), qos, retained);
                promise.resolve(true);
            } catch (e: MqttException) {
                e.printStackTrace();
                promise.reject(errorNativeException, e);
            }
        } else {
            promise.reject(errorInvalidClient, "无效的client：$serverUri,$clientId");
        }
    }

    @ReactMethod
    fun subscribe(serverUri: String, clientId: String, topic: String, qos: Int, promise: Promise) {
        var clientKey = "$serverUri,$clientId";
        if(NBBaseMQTTModule.clientMaps.containsKey(clientKey)) {
            var client: MqttAndroidClient = NBBaseMQTTModule.clientMaps[clientKey]!!;
            try {
                client.subscribe(topic, qos);
                promise.resolve(true);
            } catch(e: MqttException) {
                e.printStackTrace();
                promise.reject(errorNativeException, e);
            }
        } else {
            promise.reject(errorInvalidClient, "无效的client：$serverUri,$clientId");
        }
    }

    @ReactMethod 
    fun disConnectServer(serverUri: String, clientId: String, promise: Promise) {
        var clientKey = "$serverUri,$clientId";
        if(NBBaseMQTTModule.clientMaps.containsKey(clientKey)) {
            var client: MqttAndroidClient = NBBaseMQTTModule.clientMaps[clientKey]!!;
            try {
                client.disconnect();
                NBBaseMQTTModule.clientMaps.remove(clientKey);
                promise.resolve(true);
            } catch(e: MqttException) {
                e.printStackTrace();
                promise.reject(errorNativeException, e);
            }
        } else {
            promise.reject(errorInvalidClient, "无效的client：$serverUri,$clientId");
        }
    }

    fun sendJsMsg(serverUri: String, clientId: String, msgTag: String, msg: String) {
        val data = Arguments.createMap()
        data.putString("serverUri", serverUri);
        data.putString("clientId", clientId);
        data.putString("message", msg);
        data.putString("msgType", msgTag);
        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("mqttMessage", data)
    }

    fun disConnectServer(client: MqttAndroidClient) {
        try {
            client.disconnect();
        } catch(e: MqttException) {
            e.printStackTrace();
        }
    }

    class InnterMqttCallback(serverUri: String, clientId: String, options: ReadableMap, module: NBBaseMQTTModule): MqttCallback {
        var uri = serverUri
        var cid = clientId
        var opt = options
        var m: NBBaseMQTTModule = module
        override fun messageArrived(topic: String, message: MqttMessage) {
            var msg: String = String(message.getPayload());
            m.sendJsMsg(uri, cid, "msgArrived", msg);
        }

        override fun deliveryComplete(token: IMqttDeliveryToken) {

        }

        override fun connectionLost(e: Throwable?) {
            var msg: String = "未知原因";
            if(e !=  null) {
                msg = e.message as String;
            }
            m.sendJsMsg(uri, cid, "connectLost", msg);
        }
    }

    class InnterIMqttActionListener(serverUri: String, clientId: String, options: ReadableMap, module: NBBaseMQTTModule): IMqttActionListener {
        var uri = serverUri
        var cid = clientId
        var opt = options
        var m: NBBaseMQTTModule = module
        override fun onSuccess(token: IMqttToken) {
            m.sendJsMsg(uri, cid, "connectSuccess", token.toString());
        }

        override fun onFailure(token: IMqttToken, e: Throwable) {
            e.printStackTrace();
            m.connectServer(uri, cid, opt, null);
        }
    }
}
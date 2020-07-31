#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface NBBaseMQTTModule : RCTEventEmitter <RCTBridgeModule>
@end

@implementation NBBaseMQTTModule

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(isConnected, serverUri: NSString 
    clientId: NSString
    resolvePromise: (RCTPromiseResolveBlock) resolve
    rejectPromise: (RCTPromiseRejectBlock) reject ) {

}

@end
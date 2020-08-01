#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface NBBaseMQTTModule : RCTEventEmitter <RCTBridgeModule>
@end

@implementation NBBaseMQTTModule

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(isConnected, serverUri: (NSString *)  serverUri
    clientId: (NSString *)  clientId
    resolvePromise: (RCTPromiseResolveBlock) resolve
    rejectPromise: (RCTPromiseRejectBlock) reject ) {

}

- (NSArray<NSString *> *)supportedEvents {
    return @[];
}

@end
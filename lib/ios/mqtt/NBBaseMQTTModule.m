#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <MQTTKit.h>

@interface NBBaseMQTTModule : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic, strong) MQTTClient *client;
@property (nonatomic, strong) NSString *serverUri;
@property (nonatomic, strong) NSString *clientId;
@property (nonatomic, assign) BOOL isConnected;

@end

@implementation NBBaseMQTTModule

@synthesize client = _client;
@synthesize isConnected = _isConnected;
@synthesize serverUri = _serverUri;
@synthesize clientId = _clientId;

RCT_EXPORT_MODULE()

RCT_REMAP_METHOD(connectServer, serverUri: (NSString *)  serverUri
    clientId: (NSString *)  clientId
    options: (NSDictionary *) options
    resolvePromise: (RCTPromiseResolveBlock) resolve
    rejectPromise: (RCTPromiseRejectBlock) reject ) {
    
    self.serverUri = serverUri;
    self.clientId = clientId;

    __weak NBBaseMQTTModule * md = self;
    
    NSString * host = serverUri;
    _client = [[MQTTClient alloc] initWithClientId:clientId];
    
    if([serverUri rangeOfString:@"tcp://"].location != NSNotFound) {
        host = [serverUri substringFromIndex:6];
    }
    
    if([host rangeOfString:@":"].location != NSNotFound) {
        self.client.port = [[host substringFromIndex:[host rangeOfString:@":"].location + 1] intValue];
        host = [host substringToIndex:[host rangeOfString:@":"].location];
    }
    
    NSLog(@"链接服务:%@:%d", host, self.client.port);

    if(options[@"userName"]) {
        self.client.username = options[@"userName"];
    }

    if(options[@"password"]) {
        self.client.password = options[@"password"];
    }

    if(options[@"cleanSession"]) {
        self.client.cleanSession = options[@"cleanSession"];
    }

    [self.client connectToHost:host
         completionHandler:^(NSUInteger code) {
        if (code == ConnectionAccepted) {
            md.isConnected = YES;
            resolve(@YES);
            dispatch_async(dispatch_get_main_queue(), ^{
                [md sendJSMessage: @"" messageType: @"connectSuccess"];
            });
        } else {
            resolve(@NO);
        }
    }];

    [self.client setMessageHandler:^(MQTTMessage *message) {
        dispatch_async(dispatch_get_main_queue(), ^{
            [md sendJSMessage: message.payloadString messageType: @"msgArrived"];
        });
    }];
}

RCT_REMAP_METHOD(isConnected, serverUri: (NSString *)  serverUri
    clientId: (NSString *)  clientId
    resolvePromise: (RCTPromiseResolveBlock) resolve
    rejectPromise: (RCTPromiseRejectBlock) reject ) {
    
    if(self.client && self.isConnected) {
        resolve(@YES);
        return;
    }
    resolve(@NO);
}

RCT_REMAP_METHOD(subscribe, serverUri: (NSString *)  serverUri
    clientId: (NSString *)  clientId
    subscribe: (NSString *)  subscribe
    qos: (NSUInteger) qos
    resolvePromise: (RCTPromiseResolveBlock) resolve
    rejectPromise: (RCTPromiseRejectBlock) reject ) {
    [self.client subscribe:subscribe
         withCompletionHandler:^(NSArray *grantedQos) {
        NSLog(@"subscribed to topic %@", subscribe);
        resolve(@YES);
    }];
}

RCT_REMAP_METHOD(disconnect, resolvePromise: (RCTPromiseResolveBlock) resolve
    rejectPromise: (RCTPromiseRejectBlock) reject ) {
    [self.client disconnectWithCompletionHandler:^(NSUInteger code) {
        NSLog(@"MQTT is disconnected");
        resolve(@YES);
    }];
    self.client = nil;
}

- (void) sendJSMessage:(NSString *) msg messageType: (NSString *) msgType {
    [self sendEventWithName:@"mqttMessage" body:@{@"msgType": msgType, @"serverUri": _serverUri, @"clientId": _clientId, @"message": msg}];
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"mqttMessage"];
}

@end

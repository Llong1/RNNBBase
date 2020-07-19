import React from "react";
import { SvgXml } from "react-native-svg";
import { ViewProps, TouchableOpacity } from "react-native";
import { View } from "native-base";

export interface NBIconPros extends ViewProps {
    size?: number,
    color?: string,
    onPress?: Function,
    activeOpacity?: number
}

export const NBIconUser = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M16.552 6.667h11.448c0.736 0 1.333 0.597 1.333 1.333v0 18.667c0 0.736-0.597 1.333-1.333 1.333v0h-24c-0.736 0-1.333-0.597-1.333-1.333v0-21.333c0-0.736 0.597-1.333 1.333-1.333v0h9.885l2.667 2.667zM5.333 6.667v18.667h21.333v-16h-11.219l-2.667-2.667h-7.448zM10.667 24c0-2.946 2.388-5.333 5.333-5.333s5.333 2.388 5.333 5.333v0h-10.667zM16 17.333c-1.841 0-3.333-1.492-3.333-3.333s1.492-3.333 3.333-3.333v0c1.841 0 3.333 1.492 3.333 3.333s-1.492 3.333-3.333 3.333v0z"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconSafeCode = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1594622230550" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2008" xmlns:xlink="http://www.w3.org/1999/xlink" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><defs><style type="text/css"></style></defs><path d="M511.92574 1023.975247C357.959389 1023.975247 71.50029 794.49855 71.50029 577.448076V163.162251c0-10.049894 8.416167-18.16902 18.837362-18.379424l24.95146-0.420808c0.953007 0 98.766196-1.967898 199.599304-41.895185 103.481725-40.843164 170.179849-87.936569 170.885322-88.419261l14.691162-10.421195a19.86463 19.86463 0 0 1 11.398956-3.601625 19.480951 19.480951 0 0 1 11.324696 3.539741l14.975826 10.507832c0.680719 0.482692 67.440727 47.526591 170.798685 88.419262 100.932121 39.927287 198.74531 41.895185 199.747825 41.895184l24.753432 0.420809c10.433572 0.210404 18.824985 8.32953 18.824986 18.379423l0.210404 414.285825c0 217.02572-286.508606 446.527171-440.6111 446.527171z m372.625797-812.568556c-37.860375-2.846645-117.516921-12.624251-200.267646-45.385419-84.557726-33.417134-146.725972-71.005221-172.358151-87.602398-25.557919 16.535293-87.763295 54.135757-172.296268 87.602398-82.602205 32.686908-162.03597 42.464514-200.416167 45.385419v366.041385c0 170.216979 249.576484 378.281957 372.712435 378.281957 47.724618 0 140.723264-38.726745 232.137691-123.767163 88.12222-81.909108 140.723264-177.07368 140.723264-254.490041z m-407.948946 435.660414a33.305744 33.305744 0 0 1-23.899439 10.049894 33.738929 33.738929 0 0 1-23.998453-10.037517l-101.674724-102.330691a34.345388 34.345388 0 0 1 0-48.269193 33.664668 33.664668 0 0 1 47.935022 0l77.738155 78.183717 196.269967-197.69329a33.590408 33.590408 0 0 1 47.910269 0 34.18449 34.18449 0 0 1 0 48.269194z m0 0" p-id="2009"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconArrowRight = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconArrowLeft = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 24, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconPhone = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconLock = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="64 64 896 896" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM540 701v53c0 4.4-3.6 8-8 8h-40c-4.4 0-8-3.6-8-8v-53a48.01 48.01 0 1 1 56 0zm152-237H332V240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224z"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconMessage = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1594716852017" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17466" xmlns:xlink="http://www.w3.org/1999/xlink" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><defs><style type="text/css"></style></defs><path d="M511.525926 879.786667c-33.374815 0-66.654815-3.318519-98.986667-9.860741-15.36-3.128889-25.315556-18.10963-22.281481-33.564445 3.128889-15.36 18.10963-25.315556 33.564444-22.281481 28.539259 5.783704 58.121481 8.722963 87.703704 8.722963 217.505185 0 394.42963-157.771852 394.42963-351.573333 0-38.020741-6.731852-75.472593-20.100741-111.122963-5.499259-14.696296 1.991111-31.099259 16.687407-36.598519 14.696296-5.499259 31.099259 1.991111 36.598519 16.687408 15.739259 42.097778 23.703704 86.186667 23.703703 131.034074 0 55.561481-12.136296 109.416296-35.934814 160.047407-22.945185 48.734815-55.656296 92.34963-97.374815 129.801482-41.434074 37.262222-89.694815 66.465185-143.36 86.85037-55.277037 21.238519-114.062222 31.857778-174.648889 31.857778zM250.216296 798.625185c-5.688889 0-11.377778-1.706667-16.402963-5.214815C181.096296 756.148148 137.481481 707.887407 107.614815 653.842963c-31.478519-56.983704-47.407407-118.423704-47.407408-182.518519 0-55.561481 12.136296-109.416296 35.934815-160.047407 22.945185-48.734815 55.656296-92.34963 97.374815-129.801481 41.434074-37.262222 89.694815-66.465185 143.36-86.850371 55.371852-21.048889 114.157037-31.762963 174.743704-31.762963 73.007407 0 145.540741 16.118519 209.825185 46.648889 14.222222 6.731852 20.195556 23.703704 13.463704 37.925926-6.731852 14.222222-23.703704 20.195556-37.925926 13.463704-56.604444-26.927407-120.699259-41.14963-185.362963-41.14963-217.505185 0-394.42963 157.771852-394.42963 351.573333 0 107.899259 54.518519 208.402963 149.617778 275.626667 12.8 9.102222 15.834074 26.832593 6.826667 39.632593-5.688889 7.86963-14.506667 12.041481-23.41926 12.041481z" p-id="17467"></path><path d="M313.931852 471.324444m-28.444445 0a28.444444 28.444444 0 1 0 56.888889 0 28.444444 28.444444 0 1 0-56.888889 0Z" p-id="17468"></path><path d="M313.931852 528.213333c-31.383704 0-56.888889-25.505185-56.888889-56.888889s25.505185-56.888889 56.888889-56.888888 56.888889 25.505185 56.888889 56.888888-25.505185 56.888889-56.888889 56.888889z m0-56.888889z" p-id="17469"></path><path d="M511.525926 471.324444m-28.444445 0a28.444444 28.444444 0 1 0 56.888889 0 28.444444 28.444444 0 1 0-56.888889 0Z" p-id="17470"></path><path d="M511.525926 528.213333c-31.383704 0-56.888889-25.505185-56.888889-56.888889s25.505185-56.888889 56.888889-56.888888 56.888889 25.505185 56.888889 56.888888-25.505185 56.888889-56.888889 56.888889z m0-56.888889z" p-id="17471"></path><path d="M709.12 471.324444m-28.444444 0a28.444444 28.444444 0 1 0 56.888888 0 28.444444 28.444444 0 1 0-56.888888 0Z" p-id="17472"></path><path d="M709.12 528.213333c-31.383704 0-56.888889-25.505185-56.888889-56.888889s25.505185-56.888889 56.888889-56.888888 56.888889 25.505185 56.888889 56.888888-25.505185 56.888889-56.888889 56.888889z m0-56.888889zM248.699259 967.111111c-4.93037 0-9.860741-1.232593-14.222222-3.792592-8.817778-5.12-14.222222-14.506667-14.222222-24.651852V768.18963c0-15.739259 12.705185-28.444444 28.444444-28.444445s28.444444 12.705185 28.444445 28.444445V889.362963l123.448889-71.300741c13.558519-7.86963 31.004444-3.223704 38.874074 10.42963 7.86963 13.558519 3.223704 31.004444-10.42963 38.874074L262.921481 963.318519c-4.361481 2.56-9.291852 3.792593-14.222222 3.792592z" p-id="17473"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconMessageX = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 22, color: 'rgba(144, 144, 144, 1)' }, iconProps);
    const comp = <SvgXml xml={`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1594799711127" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25501" xmlns:xlink="http://www.w3.org/1999/xlink"  width="${props.size}" height="${props.size}"><defs><style type="text/css"></style></defs><path d="M716.288 792.704H422.29248a36.38784 36.38784 0 0 0-19.9168 5.888L282.68032 877.056c-20.48 13.41952-48.7424 2.88768-54.13376-20.16256l-8.9088-38.12352a34.68288 34.68288 0 0 0-34.21696-26.05568l0.1792-124.17536c0.09728-67.52768 57.79968-122.23488 128.9472-122.23488h471.82336a34.18624 34.18624 0 0 1 35.04128 33.28v113.34656c0 55.10144-47.06816 99.77344-105.12384 99.77344z" fill="#F4CA1C" p-id="25502" data-spm-anchor-id="a313x.7781069.0.i52" class=""></path><path d="M810.19904 92.16H401.97632a162.94912 162.94912 0 0 0-161.96608 149.02272h-26.2144A162.98496 162.98496 0 0 0 51.2 404.17792v243.2a162.816 162.816 0 0 0 122.02496 157.87008 7.87968 7.87968 0 0 1 5.79584 7.7824l-0.30208 57.2416a55.808 55.808 0 0 0 82.432 49.664l200.9856-108.544a8.10496 8.10496 0 0 1 3.84512-0.97792h210.59584a162.97984 162.97984 0 0 0 162.60096-162.9952v-243.2a162.98496 162.98496 0 0 0-162.60096-162.9952H309.69344a93.57312 93.57312 0 0 1 92.28288-79.73376h408.22272a93.66016 93.66016 0 0 1 93.44 93.66528V458.752a93.88032 93.88032 0 0 1-21.42208 59.67872 34.61632 34.61632 0 1 0 53.2736 44.22144A163.47648 163.47648 0 0 0 972.8 458.752V255.1552A162.98496 162.98496 0 0 0 810.19904 92.16zM770.048 404.17792v243.2a93.65504 93.65504 0 0 1-93.44 93.66528H465.9968a77.4144 77.4144 0 0 0-36.64896 9.2672l-181.34528 97.97632 0.1792-34.87232A77.09696 77.09696 0 0 0 190.464 738.11968a93.55264 93.55264 0 0 1-70.08256-90.72128v-243.2a93.66016 93.66016 0 0 1 93.44-93.66528h462.79168a93.65504 93.65504 0 0 1 93.43488 93.6448z m-433.99168 128.16384a36.38272 36.38272 0 1 0-36.38272 36.49024 36.42368 36.42368 0 0 0 36.38272-36.49024z m141.75744 0a36.38272 36.38272 0 1 0-36.3776 36.46976 36.42368 36.42368 0 0 0 36.3776-36.46976z m141.76256 0a36.38272 36.38272 0 1 0-36.38272 36.46976 36.4288 36.4288 0 0 0 36.38272-36.46976z" fill="#503E9D" p-id="25503" data-spm-anchor-id="a313x.7781069.0.i51" class=""></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconSWap = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 14, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="64 64 896 896" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M847.9 592H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h605.2L612.9 851c-4.1 5.2-.4 13 6.3 13h72.5c4.9 0 9.5-2.2 12.6-6.1l168.8-214.1c16.5-21 1.6-51.8-25.2-51.8zM872 356H266.8l144.3-183c4.1-5.2.4-13-6.3-13h-72.5c-4.9 0-9.5 2.2-12.6 6.1L150.9 380.2c-16.5 21-1.6 51.8 25.1 51.8h696c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconAlipay = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 200, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1594911047763" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2010" xmlns:xlink="http://www.w3.org/1999/xlink" width="${props.size}" height="${props.size}"><defs><style type="text/css"></style></defs><path d="M230.4 576.512c-12.288 9.728-25.088 24.064-28.672 41.984-5.12 24.576-1.024 55.296 22.528 79.872 28.672 29.184 72.704 37.376 91.648 38.912 51.2 3.584 105.984-22.016 147.456-50.688 16.384-11.264 44.032-34.304 70.144-69.632-59.392-30.72-133.632-64.512-212.48-61.44-40.448 1.536-69.632 9.728-90.624 20.992z m752.64 135.68c26.112-61.44 40.96-129.024 40.96-200.192C1024 229.888 794.112 0 512 0S0 229.888 0 512s229.888 512 512 512c170.496 0 321.536-83.968 414.72-211.968-88.064-43.52-232.96-115.712-322.56-159.232-42.496 48.64-105.472 97.28-176.64 118.272-44.544 13.312-84.992 18.432-126.976 9.728-41.984-8.704-72.704-28.16-90.624-47.616-9.216-10.24-19.456-22.528-27.136-37.888 0.512 1.024 1.024 2.048 1.024 3.072 0 0-4.608-7.68-7.68-19.456-1.536-6.144-3.072-11.776-3.584-17.92-0.512-4.096-0.512-8.704 0-12.8-0.512-7.68 0-15.872 1.536-24.064 4.096-20.48 12.8-44.032 35.328-65.536 49.152-48.128 114.688-50.688 148.992-50.176 50.176 0.512 138.24 22.528 211.968 48.64 20.48-43.52 33.792-90.112 41.984-121.344h-307.2v-33.28h157.696v-66.56H272.384V302.08h190.464V235.52c0-9.216 2.048-16.384 16.384-16.384h74.752V302.08h207.36v33.28h-207.36v66.56h165.888s-16.896 92.672-68.608 184.32c115.2 40.96 278.016 104.448 331.776 125.952z" fill="#06B4FD" p-id="2011"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconCubes = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 18, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M24.078 13.534v-7.631l-7.986-3.549-7.985 3.549v7.631l-7.099 3.195v8.693l7.986 3.552 7.098-3.196 7.099 3.195 7.989-3.55v-8.693l-7.099-3.196zM22.303 13.534l-5.327 2.485v-5.856l5.323-2.485v5.856zM16.089 4.307l4.791 2.128-4.791 2.13-4.789-2.13 4.789-2.129zM15.203 10.163v5.856l-5.325-2.485v-5.856l5.323 2.485zM8.107 26.665l-5.323-2.483v-5.856l5.323 2.485v5.856zM4.203 17.259l4.791-2.129 4.791 2.13-4.791 2.131-4.791-2.132zM15.205 24.181l-5.323 2.485v-5.856l5.323-2.485v5.856zM22.304 26.667l-5.325-2.485v-5.856l5.323 2.485v5.856zM18.4 17.261l4.789-2.13 4.793 2.13-4.791 2.129-4.789-2.129zM29.402 24.181l-5.323 2.485v-5.856l5.323-2.485v5.856z"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconNotice = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 20, color: 'rgba(236, 101, 110, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12zm-10 5h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

/**
 * 列表字符图标，对应：md-list
 * @param iconProps 
 */
export const NBIconList = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 50, color: 'rgba(80, 62, 157, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

/**
 * 添加列表字符图标，对应md-playlist_add
 * @param iconProps 
 */
export const NBIconPayAddList = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 40, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

/**
 * 添加列表确认字符图标，对应md-playlist_add_check
 * @param iconProps 
 */
export const NBIconPayAddCheckList = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 40, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zM2 16h8v-2H2v2zm19.5-4.5L23 13l-6.99 7-4.51-4.5L13 14l3.01 3 5.49-5.5z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

/**
 * 确认字符图标，对应md-check
 * @param iconProps 
 */
export const NBIconCheck = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 40, color: 'rgba(255, 255, 255, 1)' }, iconProps);
    const comp = <SvgXml xml={`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${props.size}" height="${props.size}" style="fill: ${props.color};"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIconLoading = (iconProps: NBIconPros) => {
    const props: NBIconPros = Object.assign({ size: 40, color: '#262626' }, iconProps);
    const comp = <SvgXml xml={`<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1595156796218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2146" xmlns:xlink="http://www.w3.org/1999/xlink" width="${props.size}" height="${props.size}"><defs><style type="text/css"></style></defs><path d="M876.864 782.592c3.264 0 6.272-3.2 6.272-6.656 0-3.456-3.008-6.592-6.272-6.592-3.264 0-6.272 3.2-6.272 6.592 0 3.456 3.008 6.656 6.272 6.656z m-140.544 153.344c2.304 2.432 5.568 3.84 8.768 3.84a12.16 12.16 0 0 0 8.832-3.84 13.76 13.76 0 0 0 0-18.56 12.224 12.224 0 0 0-8.832-3.84 12.16 12.16 0 0 0-8.768 3.84 13.696 13.696 0 0 0 0 18.56zM552.32 1018.24c3.456 3.648 8.32 5.76 13.184 5.76a18.368 18.368 0 0 0 13.184-5.76 20.608 20.608 0 0 0 0-27.968 18.368 18.368 0 0 0-13.184-5.824 18.368 18.368 0 0 0-13.184 5.76 20.608 20.608 0 0 0 0 28.032z m-198.336-5.76c4.608 4.8 11.072 7.68 17.6 7.68a24.448 24.448 0 0 0 17.536-7.68 27.456 27.456 0 0 0 0-37.248 24.448 24.448 0 0 0-17.536-7.68 24.448 24.448 0 0 0-17.6 7.68 27.52 27.52 0 0 0 0 37.184z m-175.68-91.84c5.76 6.08 13.824 9.6 21.952 9.6a30.592 30.592 0 0 0 22.016-9.6 34.368 34.368 0 0 0 0-46.592 30.592 30.592 0 0 0-22.016-9.6 30.592 30.592 0 0 0-21.952 9.6 34.368 34.368 0 0 0 0 46.592z m-121.152-159.36c6.912 7.36 16.64 11.648 26.368 11.648a36.736 36.736 0 0 0 26.432-11.584 41.28 41.28 0 0 0 0-55.936 36.736 36.736 0 0 0-26.432-11.584 36.8 36.8 0 0 0-26.368 11.52 41.28 41.28 0 0 0 0 56zM12.736 564.672a42.88 42.88 0 0 0 30.784 13.44 42.88 42.88 0 0 0 30.784-13.44 48.128 48.128 0 0 0 0-65.216 42.88 42.88 0 0 0-30.72-13.44 42.88 42.88 0 0 0-30.848 13.44 48.128 48.128 0 0 0 0 65.216z m39.808-195.392a48.96 48.96 0 0 0 35.2 15.36 48.96 48.96 0 0 0 35.2-15.36 54.976 54.976 0 0 0 0-74.56 48.96 48.96 0 0 0-35.2-15.424 48.96 48.96 0 0 0-35.2 15.424 54.976 54.976 0 0 0 0 74.56zM168.32 212.48c10.368 11.008 24.96 17.408 39.68 17.408 14.592 0 29.184-6.4 39.552-17.408a61.888 61.888 0 0 0 0-83.84 55.104 55.104 0 0 0-39.616-17.408c-14.656 0-29.248 6.4-39.616 17.408a61.888 61.888 0 0 0 0 83.84zM337.344 124.8c11.52 12.16 27.712 19.264 43.968 19.264 16.256 0 32.448-7.04 43.968-19.264a68.672 68.672 0 0 0 0-93.184 61.248 61.248 0 0 0-43.968-19.264 61.248 61.248 0 0 0-43.968 19.264 68.736 68.736 0 0 0 0 93.184z m189.632-1.088c12.672 13.44 30.528 21.248 48.448 21.248s35.712-7.808 48.384-21.248a75.584 75.584 0 0 0 0-102.464A67.392 67.392 0 0 0 575.36 0c-17.92 0-35.776 7.808-48.448 21.248a75.584 75.584 0 0 0 0 102.464z m173.824 86.592c13.824 14.592 33.28 23.104 52.736 23.104 19.584 0 39.04-8.512 52.8-23.104a82.432 82.432 0 0 0 0-111.744 73.472 73.472 0 0 0-52.8-23.168c-19.52 0-38.912 8.512-52.736 23.168a82.432 82.432 0 0 0 0 111.744z m124.032 158.528c14.976 15.872 36.032 25.088 57.216 25.088 21.12 0 42.24-9.216 57.152-25.088a89.344 89.344 0 0 0 0-121.088 79.616 79.616 0 0 0-57.152-25.088c-21.184 0-42.24 9.216-57.216 25.088a89.344 89.344 0 0 0 0 121.088z m50.432 204.032c16.128 17.088 38.784 27.008 61.632 27.008 22.784 0 45.44-9.92 61.568-27.008a96.256 96.256 0 0 0 0-130.432 85.76 85.76 0 0 0-61.568-27.072c-22.848 0-45.44 9.984-61.632 27.072a96.192 96.192 0 0 0 0 130.432z" fill="${props.color}" p-id="2147"></path></svg>`} />
    return props.onPress ? <TouchableOpacity onPress={() => {
        if (props.onPress) {
            props.onPress();
        }
    }} style={[{ width: props.size, height: props.size }, props.style]} activeOpacity={props.activeOpacity === undefined ? 0.8 : props.activeOpacity}>
        {comp}
    </TouchableOpacity> : <View style={[{ width: props.size, height: props.size }, props.style]}>
            {comp}
        </View>
}

export const NBIcons = {
    NBIconNotice,
    NBIconArrowRight,
    NBIconList,
    NBIconPayAddList,
    NBIconPayAddCheckList,
    NBIconCheck,
    NBIconLoading
}
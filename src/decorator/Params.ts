import {defaultMetadataArgsStorage} from "../index";
import {ParamMetadataArgs} from "../metadata/args/ParamMetadataArgs";

/**
 * Injects all request's route parameters to the controller action parameter.
 * Must be applied on a controller action parameters.
 */
export function Params(name: string): Function {
    return function (object: Object, methodName: string, index: number) {
        const format = (Reflect as any).getMetadata("design:paramtypes", object, methodName)[index];
        const metadata: ParamMetadataArgs = {
            target: object.constructor,
            method: methodName,
            index: index,
            type: "param",
            reflectedType: format,
            name: name,
            format: format,
            parseJson: false, // it does not make sense for Param to be parsed
            isRequired: true, // params are always required, because if they are missing router will not match the route
            classTransformOptions: undefined
        };
        defaultMetadataArgsStorage().params.push(metadata);
    };
}
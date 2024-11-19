import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<string | number | null | undefined>;
        default: string;
    };
    items: {
        type: ArrayConstructor;
        required: true;
    };
    optionId: {
        type: StringConstructor;
        required: true;
    };
    optionLabel: {
        type: StringConstructor;
        required: true;
    };
}>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<string | number | null | undefined>;
        default: string;
    };
    items: {
        type: ArrayConstructor;
        required: true;
    };
    optionId: {
        type: StringConstructor;
        required: true;
    };
    optionLabel: {
        type: StringConstructor;
        required: true;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: string | number | null | undefined;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;

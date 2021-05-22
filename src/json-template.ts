interface ResolvableTemplate {
    tpl: (arg: unknown) => Template;
    resolveTplArgs: () => unknown;
    joinChar?: string;
    enable?: unknown;
}

interface BaseTemplate {
    tpl: Template | Array<Template>;
    joinChar?: string;
    enable?: unknown;
}

export type Template = string | BaseTemplate | ResolvableTemplate | null;

const isObject = (val: unknown): boolean =>
    val != null && typeof val === 'object' && Array.isArray(val) === false;

const applyTemplate = (tplConfig: Template) => {
    if (tplConfig == null) return null;
    if (typeof tplConfig === 'string') return tplConfig;
    const tplConfigObj = tplConfig;

    const { joinChar, enable } = tplConfigObj;
    const isEnabled = tplConfig.hasOwnProperty('enable') ? enable : true;

    if (isEnabled) {
        if ('resolveTplArgs' in tplConfig) {
            const { tpl, resolveTplArgs } = tplConfig;
            const tplArgs = resolveTplArgs();
            const nestedTpl = tplArgs ? tpl(tplArgs) : null;
            return nestedTpl && apply(nestedTpl, joinChar);
        } else {
            const { tpl } = tplConfig;
            return Array.isArray(tpl) || isObject(tpl)
                ? apply(tpl, joinChar)
                : tpl;
        }
    }
};

export const apply = (
    tpl: Template | Array<Template>,
    joinChar: string = '',
): string => {
    return (Array.isArray(tpl) ? tpl : [tpl])
        .map(applyTemplate)
        .filter(Boolean)
        .join(joinChar);
};

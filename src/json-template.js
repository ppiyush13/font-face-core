const isObject = (val) =>
    val != null && typeof val === 'object' && Array.isArray(val) === false;

const applyTemplate = (tplConfig) => {
    if (tplConfig == null) return null;
    const tplConfigObj = isObject(tplConfig) ? tplConfig : { tpl: tplConfig };

    const { tpl, joinChar, enable, resolveTplArgs } = tplConfigObj;
    const isEnabled = tplConfig.hasOwnProperty('enable') ? enable : true;

    if (isEnabled) {
        if (resolveTplArgs) {
            const tplArgs = resolveTplArgs();
            const nestedTpl = tplArgs ? tpl(tplArgs) : null;
            return nestedTpl && apply(nestedTpl, joinChar);
        } else {
            return Array.isArray(tpl) || isObject(tpl)
                ? apply(tpl, joinChar)
                : tpl;
        }
    }
};

export const apply = (tpl, joinChar = '') => {
    return (Array.isArray(tpl) ? tpl : [tpl])
        .map(applyTemplate)
        .filter(Boolean)
        .join(joinChar);
};

import template from './template';

export default ({ directoryContext, fonts }) => {
    const fontConfigList = Array.isArray(fonts) ? fonts : [fonts];

    const fontFaceStrList = fontConfigList.map((fontConfig) => {
        const fileResolver = (ext) => {
            const fileName = `./${fontConfig.file}.${ext}`;
            return directoryContext.exists(fileName)
                ? directoryContext.resolve(fileName)
                : null;
        };

        return template(fontConfig, fileResolver);
    });

    return fontFaceStrList.join('\n');
};

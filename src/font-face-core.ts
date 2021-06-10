import template from './template';
import { FontFaceCore, DirectoryContext, FontFaceConfig } from './types';

export const fontFaceCore = ({ directoryContext, fonts }: FontFaceCore) => {
    const fontConfigList = Array.isArray(fonts) ? fonts : [fonts];

    const fontFaceStrList = fontConfigList.map((fontConfig) => {
        const fileResolver = (ext: string) => {
            const fileName = `./${fontConfig.file}.${ext}`;
            return directoryContext.exists(fileName)
                ? directoryContext.resolve(fileName)
                : null;
        };

        return template(fontConfig, fileResolver);
    });

    return fontFaceStrList.join('\n');
};

export { FontFaceCore, DirectoryContext, FontFaceConfig };

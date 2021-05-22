import template from './template';
import { AtRule } from 'csstype';

interface DirectoryContext {
    exists(fileName: string): boolean;
    resolve(fileName: string): string;
}

type FontFace = AtRule.FontFace;
export interface FontConfig {
    name: string;
    file: string;
    weight?: FontFace['fontWeight'];
    display?: FontFace['fontDisplay'];
    stretch?: FontFace['fontStretch'];
    style?: FontFace['fontStyle'];
    variant?: FontFace['fontVariant'];
    unicodeRange?: FontFace['unicodeRange'];
    featureSettings?: FontFace['fontFeatureSettings'];
    variationSettings?: FontFace['fontVariationSettings'];
}

export default ({
    directoryContext,
    fonts,
}: {
    directoryContext: DirectoryContext;
    fonts: FontConfig | FontConfig[];
}) => {
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

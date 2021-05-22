import { AtRule } from 'csstype';

export interface DirectoryContext {
    exists(fileName: string): boolean;
    resolve(fileName: string): string;
}

export interface FontFaceConfig {
    name: string;
    file: string;
    weight?: AtRule.FontFace['fontWeight'];
    display?: AtRule.FontFace['fontDisplay'];
    stretch?: AtRule.FontFace['fontStretch'];
    style?: AtRule.FontFace['fontStyle'];
    variant?: AtRule.FontFace['fontVariant'];
    unicodeRange?: AtRule.FontFace['unicodeRange'];
    featureSettings?: AtRule.FontFace['fontFeatureSettings'];
    variationSettings?: AtRule.FontFace['fontVariationSettings'];
}

export interface FontFaceCore {
    directoryContext: DirectoryContext;
    fonts: FontFaceConfig | FontFaceConfig[];
}

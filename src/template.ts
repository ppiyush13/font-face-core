import { apply } from './json-template';
import { FontConfig } from '.';

export default (
    fontConfig: FontConfig,
    fileResolver: (ext: string) => string,
) => {
    const {
        name,
        weight,
        display,
        stretch,
        style,
        variant,
        unicodeRange,
        featureSettings,
        variationSettings,
    } = fontConfig;
    const urlTemplate = (name: string, format: string) =>
        `url('${name}') format('${format}')`;

    return apply({
        joinChar: ' ',
        tpl: [
            { tpl: '@font-face {' },
            { tpl: `font-family: '${name}';` },
            {
                enable: weight,
                tpl: `font-weight: ${weight};`,
            },
            {
                enable: display,
                tpl: `font-display: ${display};`,
            },
            {
                enable: stretch,
                tpl: `font-stretch: ${stretch};`,
            },
            {
                enable: style,
                tpl: `font-style: ${style};`,
            },
            {
                enable: variant,
                tpl: `font-variant: ${variant};`,
            },
            {
                enable: unicodeRange,
                tpl: `unicode-range: ${unicodeRange};`,
            },
            {
                enable: featureSettings,
                tpl: `font-feature-settings: ${featureSettings};`,
            },
            {
                enable: variationSettings,
                tpl: `font-variation-settings: ${variationSettings};`,
            },
            {
                resolveTplArgs: () => fileResolver('eot'),
                tpl: (file) => `src: url('${file}');`,
            },
            {
                tpl: (multipleUrls) => `src: ${multipleUrls};`,
                resolveTplArgs: () =>
                    apply({
                        joinChar: ', ',
                        tpl: [
                            {
                                resolveTplArgs: () => fileResolver('eot'),
                                tpl: (file) =>
                                    urlTemplate(
                                        `${file}#iefix`,
                                        'embedded-opentype',
                                    ),
                            },
                            {
                                resolveTplArgs: () => fileResolver('woff'),
                                tpl: (file: string) =>
                                    urlTemplate(file, 'woff'),
                            },
                            {
                                resolveTplArgs: () => fileResolver('woff2'),
                                tpl: (file: string) =>
                                    urlTemplate(file, 'woff2'),
                            },
                            {
                                resolveTplArgs: () => fileResolver('ttf'),
                                tpl: (file: string) =>
                                    urlTemplate(file, 'truetype'),
                            },
                            {
                                resolveTplArgs: () => fileResolver('svg'),
                                tpl: (file) =>
                                    urlTemplate(`${file}#${name}`, 'svg'),
                            },
                        ],
                    }),
            },
            {
                tpl: '}',
            },
        ],
    });
};

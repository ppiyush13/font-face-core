import jsonTemplating from './jsonTemplating';

export default (fontConfig, fileResolver) => {
    const { name, weight, display, stretch, style, variant, unicodeRange, featureSettings, variationSettings } = fontConfig;
    const urlTemplate = (name, format) => `url('${name}') format('${format}')`;

    return jsonTemplating({
        joinChar: ' ',
        tpl: [
            '@font-face {',
            `font-family: '${name}';`,
            {
                condition: weight,
                tpl: `font-weight: ${weight};`,
            },
            {
                condition: display,
                tpl: `font-display: ${display};`,
            },
            {
                condition: stretch,
                tpl: `font-stretch: ${stretch};`,
            },
            {
                condition: style,
                tpl: `font-style: ${style};`,
            },
            {
                condition: variant,
                tpl: `font-variant: ${variant};`,
            },
            {
                condition: unicodeRange,
                tpl: `unicode-range: ${unicodeRange};`,
            },
            {
                condition: featureSettings,
                tpl: `font-feature-settings: ${featureSettings};`,
            },
            {
                condition: variationSettings,
                tpl: `font-variation-settings: ${variationSettings};`,
            },
            {
                control: 'with',
                resolve: () => fileResolver('eot'),
                tpl: file => `src: url('${file}');`,
            },
            {
                control: 'with',
                tpl: multipleUrls => `src: ${multipleUrls};`,
                resolve: jsonTemplating({
                    joinChar: ' , ',
                    tpl: [
                        {
                            control: 'with',
                            resolve: () => fileResolver('eot'),
                            tpl: file => urlTemplate(`${file}#iefix`, 'embedded-opentype'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('woff'),
                            tpl: file => urlTemplate(file, 'woff'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('woff2'),
                            tpl: file => urlTemplate(file, 'woff2'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('ttf'),
                            tpl: file => urlTemplate(file, 'truetype'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('svg'),
                            tpl: file => urlTemplate(`${file}#${name}`, 'svg'),
                        },
                    ],
                }),
            },
            '}',
        ],
    });
};
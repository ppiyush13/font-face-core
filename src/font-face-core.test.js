import fontFaceCore from '.';

describe('testing font-face core module', () => {
    it.each([
        {
            dirMap: {
                './segoe.woff': './segoe.woff',
            },
            fonts: {
                name: 'Segoe',
                weight: 400,
                style: 'italic',
                file: 'Segoe-italic_400',
                display: 'swap',
                stretch: 'condensed',
                variant: 'small-caps',
                unicodeRange: 'U+0025-00FF',
                featureSettings: '"swsh" 2',
                variationSettings: '"xhgt" 0.7',
                file: 'segoe',
            },
            expected: `
                @font-face { 
                    font-family: 'Segoe'; 
                    font-weight: 400; 
                    font-display: swap; 
                    font-stretch: condensed; 
                    font-style: italic; 
                    font-variant: small-caps; 
                    unicode-range: U+0025-00FF; 
                    font-feature-settings: "swsh" 2; 
                    font-variation-settings: "xhgt" 0.7; 
                    src: url('./segoe.woff') format('woff'); 
                }
            `,
        },
        {
            dirMap: {
                './Roboto-Light.eot': './Roboto-Light.eot',
                './Roboto-Light.ttf': './Roboto-Light.ttf',
            },
            fonts: [
                {
                    name: 'Roboto',
                    weight: 200,
                    style: 'normal',
                    file: 'Roboto-Light',
                },
            ],
            expected: `
                @font-face { 
                    font-family: 'Roboto'; 
                    font-weight: 200; 
                    font-style: normal; 
                    src: url('./Roboto-Light.eot'); 
                    src: url('./Roboto-Light.eot#iefix') format('embedded-opentype'), 
                        url('./Roboto-Light.ttf') format('truetype'); 
                }
            `,
        },
        {
            dirMap: {
                './Roboto-Light.eot': './dist/css/Roboto-Light.eot',
                './Roboto-Light.ttf': './dist/css/Roboto-Light.ttf',
                './Roboto-Light.woff': './dist/css/Roboto-Light.woff',
                './Roboto-Light.woff2': './dist/css/Roboto-Light.woff2',
                './Roboto-Light.svg': './dist/css/Roboto-Light.svg',

                './Roboto-Regular.eot': './dist/css/Roboto-Regular.eot',
                './Roboto-Regular.ttf': './dist/css/Roboto-Regular.ttf',
                './Roboto-Regular.woff': './dist/css/Roboto-Regular.woff',
                './Roboto-Regular.woff2': './dist/css/Roboto-Regular.woff2',
                './Roboto-Regular.svg': './dist/css/Roboto-Regular.svg',

                './Roboto-Medium.eot': './dist/css/Roboto-Medium.eot',
                './Roboto-Medium.ttf': './dist/css/Roboto-Medium.ttf',
                './Roboto-Medium.woff': './dist/css/Roboto-Medium.woff',
                './Roboto-Medium.woff2': './dist/css/Roboto-Medium.woff2',
                './Roboto-Medium.svg': './dist/css/Roboto-Medium.svg',
            },
            fonts: [
                {
                    name: 'Roboto',
                    weight: 200,
                    style: 'normal',
                    file: 'Roboto-Light',
                },
                {
                    name: 'Roboto',
                    weight: 400,
                    style: 'normal',
                    file: 'Roboto-Medium',
                },
                {
                    name: 'Roboto',
                    weight: 600,
                    style: 'bold',
                    file: 'Roboto-Medium',
                },
            ],
            expected: `
                @font-face { 
                    font-family: 'Roboto'; 
                    font-weight: 200; 
                    font-style: normal; 
                    src: url('./dist/css/Roboto-Light.eot'); 
                    src: url('./dist/css/Roboto-Light.eot#iefix') format('embedded-opentype'), 
                        url('./dist/css/Roboto-Light.woff') format('woff'), 
                        url('./dist/css/Roboto-Light.woff2') format('woff2'), 
                        url('./dist/css/Roboto-Light.ttf') format('truetype'), 
                        url('./dist/css/Roboto-Light.svg#Roboto') format('svg'); 
                }
                @font-face { 
                    font-family: 'Roboto'; 
                    font-weight: 400; 
                    font-style: normal; 
                    src: url('./dist/css/Roboto-Medium.eot'); 
                    src: url('./dist/css/Roboto-Medium.eot#iefix') format('embedded-opentype'), 
                        url('./dist/css/Roboto-Medium.woff') format('woff'), 
                        url('./dist/css/Roboto-Medium.woff2') format('woff2'), 
                        url('./dist/css/Roboto-Medium.ttf') format('truetype'), 
                        url('./dist/css/Roboto-Medium.svg#Roboto') format('svg'); 
                }
                @font-face { 
                    font-family: 'Roboto'; 
                    font-weight: 600; 
                    font-style: bold; 
                    src: url('./dist/css/Roboto-Medium.eot'); 
                    src: url('./dist/css/Roboto-Medium.eot#iefix') format('embedded-opentype'), 
                        url('./dist/css/Roboto-Medium.woff') format('woff'), 
                        url('./dist/css/Roboto-Medium.woff2') format('woff2'), 
                        url('./dist/css/Roboto-Medium.ttf') format('truetype'), 
                        url('./dist/css/Roboto-Medium.svg#Roboto') format('svg'); 
                }
            `,
        },
        {
            dirMap: {
                './Ubuntu-Bold_700.ttf': './Ubuntu-Bold_700.ttf',
                './Ubuntu-Bold_700.woff2': './Ubuntu-Bold_700.woff2',
                './Ubuntu-Bold_700.svg': './Ubuntu-Bold_700.svg',
            },
            fonts: [
                {
                    name: 'Ubuntu',
                    weight: 700,
                    style: 'bold',
                    file: 'Ubuntu-Bold_700',
                },
            ],
            expected: `
                @font-face { 
                    font-family: 'Ubuntu';
                    font-weight: 700; 
                    font-style: bold; 
                    src: url('./Ubuntu-Bold_700.woff2') format('woff2'), 
                        url('./Ubuntu-Bold_700.ttf') format('truetype'), 
                        url('./Ubuntu-Bold_700.svg#Ubuntu') format('svg'); 
                }
            `,
        },
    ])('expect stylesheets to be created', ({ dirMap, fonts, expected }) => {
        const result = fontFaceCore({
            directoryContext: {
                exists: (path) => !!dirMap[path],
                resolve: (path) => dirMap[path],
            },
            fonts,
        });

        expect(result).toMatch(expected);
    });
});

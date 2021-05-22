import { apply, Template } from './json-template';

describe('testing json-template module', () => {
    it.each([
        {
            tplArg: null,
            result: '',
        },
        {
            tplArg: 'any string',
            result: 'any string',
        },
        {
            tplArg: {
                enable: false,
                tpl: 'result',
            },
            result: '',
        },
        {
            tplArg: {
                enable: true,
                tpl: 'result',
            },
            result: 'result',
        },
        {
            tplArg: {
                tpl: 'result',
            },
            result: 'result',
        },
        {
            tplArg: {
                enable: undefined,
                tpl: 'result',
            },
            result: '',
        },
        {
            tplArg: {
                tpl: (value: string) => `you choose ${value}`,
                resolveTplArgs: () => 5,
            },
            result: 'you choose 5',
        },
        {
            tplArg: {
                tpl: (value: string) => `you choose ${value}`,
                resolveTplArgs: () => false,
            },
            result: '',
        },
    ])(
        'it should template',
        ({
            tplArg,
            joinChar,
            result,
        }: {
            tplArg: Template;
            joinChar?: string;
            result: string;
        }) => {
            expect(apply(tplArg, joinChar)).toMatch(result);
        },
    );
});

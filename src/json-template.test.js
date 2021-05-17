import { apply } from './json-template';

describe('testing json-template module', () => {
    it.each([
        {
            arg: {},
            result: '',
        },
        {
            arg: null,
            result: '',
        },
        {
            arg: 'any string',
            result: 'any string',
        },
        {
            arg: {
                enable: false,
                tpl: 'result',
            },
            result: '',
        },
        {
            arg: {
                enable: true,
                tpl: 'result',
            },
            result: 'result',
        },
        {
            arg: {
                tpl: 'result',
            },
            result: 'result',
        },
        {
            arg: {
                enable: undefined,
                tpl: 'result',
            },
            result: '',
        },
        {
            arg: {
                tpl: (value) => `you choose ${value}`,
                resolveTplArgs: () => 5,
            },
            result: 'you choose 5',
        },
        {
            arg: {
                tpl: (value) => `you choose ${value}`,
                resolveTplArgs: () => false,
            },
            result: '',
        },
    ])('it should template', ({ arg, joinChar, result }) => {
        expect(apply(arg, joinChar)).toMatch(result);
    });
});

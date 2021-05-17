expect.extend({
    toMatch(got, expected) {
        const normalizeStr = (str) => str.replace(/\s/g, '').toLowerCase();
        const passReturn = {
            pass: true,
            message: () => `Expected ${expected} to not be similar to ${got}`,
        };
        const failReturn = {
            pass: false,
            message: () => `Expected ${expected} to be similar to ${got}`,
        };

        return normalizeStr(got) === normalizeStr(expected)
            ? passReturn
            : failReturn;
    },
});

import aarify from 'arrify';
import template from './template';
import { arrayJoinMap } from './arrayUtils';

export default ({ directoryContext, fonts }) => {
    return arrayJoinMap(
        aarify(fonts),
        fontConfig => generateFontFace(directoryContext, fontConfig),
        '\n',
    );
};
// DirectoryContext class identifies a specific directory and the files that can be resolved within the dir.

const generateFontFace = (directoryContext, fontConfig) => {
    const fileResolver = ext => {
        const fileName = `./${fontConfig.file}.${ext}`;
        return directoryContext.exists(fileName)
            ? directoryContext.resolve(fileName)
            : null;
    };

    return template(fontConfig, fileResolver);
};

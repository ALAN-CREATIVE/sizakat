import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
import initStoryshots, {
  Stories2SnapsConverter
} from '@storybook/addon-storyshots';
import renderer from 'react-test-renderer';

import 'jest-styled-components';
import { styleSheetSerializer } from 'jest-styled-components/serializer';
import { addSerializer } from 'jest-specific-snapshot';

addSerializer(styleSheetSerializer);

registerRequireContextHook();

initStoryshots({
  test: ({ story, context }) => {
    const converter = new Stories2SnapsConverter();
    const snapshotFilename = converter.getSnapshotFileName(context);

    const storyElement = story.render(context);
    const tree = renderer.create(storyElement).toJSON();
    expect(tree).toMatchSpecificSnapshot(snapshotFilename);
  }
});

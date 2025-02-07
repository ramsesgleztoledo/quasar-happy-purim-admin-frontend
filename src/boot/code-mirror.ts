import { defineBoot } from '#q-app/wrappers';
import { basicSetup } from 'codemirror';
import VueCodemirror from 'vue-codemirror';


export default defineBoot(({ app }) => {
  app.use(VueCodemirror, {
    autofocus: true,
    disabled: false,
    indentWithTab: true,
    tabSize: 2,
    placeholder: 'Code goes here...',
    extensions: [basicSetup],
  });
});

import { defineBoot } from '#q-app/wrappers';
import { devtools } from '@vue/devtools'

export default defineBoot(() => {
  if (process.env.NODE_ENV === 'development') {
    devtools.connect()
  }
});

import { boot } from 'quasar/wrappers';
import {
  StatusBar,
  // Style
} from '@capacitor/status-bar';
import { Platform } from 'quasar'

export default boot(() => {

  // StatusBar.setOverlaysWebView({ overlay: false });

  if (Platform.is.capacitor) {
    StatusBar.hide().catch(() => {
    })
  }
  // StatusBar.setStyle({ style: Style.Dark });
});

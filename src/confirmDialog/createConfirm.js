import { createConfirmation } from 'react-confirm';
import YourDialog from './MyDialog';
 
// create confirm function
export const confirm = createConfirmation(YourDialog);
 
// This is optional. But wrapping function makes it easy to use.
export function confirmWrapper(confirmation, options = {}) {
  return confirm({ confirmation, options });
}
 
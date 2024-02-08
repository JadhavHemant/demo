import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Dialog from 'react-dialog'; // your choice.
 
const MyDialog = ({show, proceed, confirmation}) => {
  <Dialog onHide={() => proceed(false)} show={show}>
    {confirmation}
    <button onClick={() => proceed(false)}>CANCEL</button>
    <button onClick={() => proceed(true)}>OK</button>
  </Dialog>;
};
 
MyDialog.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  confirmation: PropTypes.string,  // arguments of your confirm function
  options: PropTypes.object        // arguments of your confirm function
};
 
// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(MyDialog);
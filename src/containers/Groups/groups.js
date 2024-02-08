import React, { Component } from 'react';
import CKEditor from 'ckeditor4-react';
//import select from '../row_input_elements/select';


class groups extends Component {
    constructor(props){
        super(props);
        this.selectHandler = this.selectHandler.bind(this);
    }
    selectHandler(id){
        switch(id){
           case '':
               break; 
        }
    }
    render() {
        return (
           <form id="group_form">
         
            <div className="container">
                 <div className="d-flex justify-content-center h5">Connects</div>
                    <CKEditor data="<p>This is an example CKEditor 4 WYSIWYG editor instance.</p>" />
            </div>

        </form>
        );
    }
}

export default groups;

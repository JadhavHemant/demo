import React, { Component} from 'react';
import PropTypes from 'prop-types';
class inputs extends Component {

    render() {
        const {title,id,name,class_input,class_label,type,required,step,pattern,accept} = this.props;
        return (
            <div className="row">
                 <label className={class_label}>{title}</label>
                { type == 'file' ?
                 <input  required={required} className={class_input} name={name} step={step} type={type} pattern={pattern} multiple="multiple" accept={accept} />
             : <input  required={required} className={class_input} id={id} name={name} step={step} type={type} pattern={pattern} />
               }
            </div>
        );
    }
}
inputs.PropTypes={
title:PropTypes.String,
id : PropTypes.String,
name : PropTypes.String,
class_input:PropTypes.String,
class_label:PropTypes.String,
type:PropTypes.String,
required:PropTypes.Boolean,
step:PropTypes.String
};

inputs.defaultProps={
required:false,
title:"Input Label",
type:"text",
class_input:"form-control",
class_label:"form-label col-md-4 col-lg-4",
id:"",
name:""
};

export default inputs;

import React, { Component} from 'react';
import PropTypes from 'prop-types';

class select extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const  {title,items,label_class,select_class,id,name,hanldleChange,required } = this.props;
 
     //   alert(JSON.stringify(this.props));
    
        return (
            <div className="row">
                <label className={label_class}>{title}</label>
                <select required={required} aria-required="true" id={id} name={name}  onChange={hanldleChange} className={select_class}  name={name}><option value="">Select</option>{
                       items.map(value=>(<option value={value.id}  >{value.name}</option>))
                }</select>    
            </div>
        );
    }
}
select.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
    label_class: PropTypes.string,
    select_class: PropTypes.string,
    name: PropTypes.string,
    id:PropTypes.string,
    required:PropTypes.boolean,
    hanldleChange: PropTypes.func
  };
  select.defaultProps={
    required:false,
    title:"Input Label",
    type:"text",
    class_input:"form-control",
    class_label:"form-label",
    id:"",
    name:""
    };
export default select;

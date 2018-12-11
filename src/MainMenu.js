import React, { Component } from 'react'
import { Link } from "react-router-dom";

function MenuListElem (props) {
  const { elem, elemsClass, linksClass } = props
  console.log(elem.link);
  return (
    <li className={elemsClass}>
      <Link className={linksClass} to={elem.link}>{elem.text}</Link>
    </li>
  );
}

class MainMenu extends Component {
  state = {
    elems: [
     //{link: '/', text: 'Home'},
     {link: '/transactions/new', text: 'New'},
     {link: '/transactions/list', text: 'List'},
   ]
  }

  render(){
    const { listClass, elemsClass, linksClass } = this.props
    const { elems } = this.state
    const elem = elems.map((elem) => (
      <MenuListElem
        elem={elem}
        elemsClass={elemsClass}
        linksClass={linksClass}
      />
    ))
    return(
      <ul className={listClass}>
        {elem}
      </ul>
    )
  }
}

export default MainMenu

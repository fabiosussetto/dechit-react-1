import React, { Component } from 'react'
import { Link } from "react-router-dom";

function MenuListElem (props) {
  const { elem, elemsClass, linksClass } = props
  return (
    <li className={elemsClass}>
      <Link className={linksClass} to={elem.link}>{elem.text}</Link>
    </li>
  );
}

const menuElems = [
 //{link: '/', text: 'Home'},
 {link: '/transactions/new', text: 'New'},
 {link: '/transactions/list', text: 'List'},
 {link: '/jobs', text: 'JOBS'},
]

class MainMenu extends Component {
  render(){
    const { listClass, elemsClass, linksClass } = this.props
    const menuElem = menuElems.map((elem,index) => (
      <MenuListElem
        key={index}
        elem={elem}
        elemsClass={elemsClass}
        linksClass={linksClass}
      />
    ))
    return(
      <ul className={listClass}>
        {menuElem}
      </ul>
    )
  }
}

export default MainMenu

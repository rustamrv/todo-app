import React from "react";
import classNames from "classnames";
import Badge from "../Badge";
import removeSvg from '../../assets/img/remove.svg';

import './List.scss';

const List = ({ items, isRemovable, onClick, removeList,    onClickItem, activeItem }) => {
    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                    <li
                        key={index}
                        className={classNames(item.className, { 
                            active: item.active ? item.active : activeItem && activeItem.id === item.id 
                        })}
                        onClick={() => onClickItem(item)}
                    >
                        <i>{item.icon ? item.icon : (<Badge color={item.color.name} />)}</i>
                        <span>
                            {item.name}
                            {item.tasks && ` (${item.tasks.length})`}
                        </span>
                        {isRemovable &&
                            <img
                                className="list__remove-icon"
                                src={removeSvg}
                                alt="Remove icon"
                                onClick={() => removeList(item)}
                            />
                        }
                    </li>
                ))
            }
        </ul>
    )
};

export default List;
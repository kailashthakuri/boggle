import React from "react";

interface IGameCardProps {
    title: string;
    value?: any;
    desc?: string;
    btnLabel?: string;
    children?: any;
    handler?: Function;
}

function Card(props: IGameCardProps) {
    return (
        <div>
            <div className="card">
                <div className="card-header "><strong>{props.title}</strong></div>
                {props.desc && <div className="card-body"><p className="card-text">{props.desc}</p></div>}
                {props.children && <div className="card-body">  {props.children}  </div>}
                {props.handler && <p>
                    <button className="btn btn-primary"
                            onClick={() => props.handler && props.handler(props.value)}>{props.btnLabel}</button>
                </p>}

            </div>
        </div>
    );
}

export default Card;

import './Colors.css';
import React, { Fragment, useState } from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";

const Colors = (props) => {

    const [isCopied, setIsCopied] = useState(false);
    const onCopyText = () => {
        
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000); 
    };

    return (
        <Fragment>
            <CopyToClipboard  text={props.color}>
                <div className="colorbox" onClick={onCopyText} key={props.color} style={{ backgroundColor: props.color}}>
                    <div className="topleft">{props.year}</div>
                    {isCopied ? <p>¡Copiado!</p> : 
                    <div className="description">
                        <h3>{props.name}</h3>
                        <h3>{props.color}</h3>
                    </div>}
                    <div className="bottomright">{props.pantone_value}</div>
                </div>
            </CopyToClipboard>
        </Fragment>
    )
}

export default Colors;
import React, {useEffect} from "react";
import {DataStatus, Status} from "../utils/AppData";

interface IStatusProps {
    status: Status,
    children: any
}
function StatusWrapper(props: IStatusProps) {

    useEffect(() => {
    }, [props.status])

    return (
        <React.Fragment>
            {(props.status ?
                (props.status.status == DataStatus.ErrorState ?
                    <div className="error align-self-center">Something Went Wrong!</div> :
                    (props.status.status == DataStatus.Loading ? <div>
                            <div className="text-center">
                                <div className="spinner-border text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div> :
                        props.children))
                : props.children)}
        </React.Fragment>
    )

}


export default StatusWrapper;

import React,{Component} from "react";
import loading from '../loading.gif'
export class Spinner extends Component{
    render(){
        return(
            <div className="d-flex justify-content-center my-4">
                <img src={loading}alt="loading"style={{width:"15rem"}}>

                </img>
            </div>
        )
    }
}
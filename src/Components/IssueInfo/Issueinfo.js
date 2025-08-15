import { Button, ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import '../../App.css';

const Issueinfo = (props) => {
    console.log(props.issue)
    const issueArr = props.issue;
    return (
        <div>
            {
                issueArr.map(item => <ShowIssue handleClose={props.handleClose} handleDelete={props.handleDelete} issue={item}></ShowIssue>)
            }
        </div>
    );
};


function ShowIssue(props) {

    console.log(props.issue)
    const { id, status, desc, assign, option } = props.issue;
    return (

        <ChakraProvider>
            <div className='show_con'>

                <h6>Issue ID: {id} </h6>
                <p><span class="label label-info"> {status} </span></p>
                {
                    status === 'Close' && <h3><del>{desc}</del></h3>
                }
                {
                    status !== 'Close' && <h3>{desc}</h3>
                }
                <p><span class="glyphicon glyphicon-time"></span> {option}</p>
                <p><span class="glyphicon glyphicon-user"></span> {assign}</p>
                <Button className='chakra_btn' onClick={() => props.handleClose(id)} colorScheme='yellow'>Close</Button>
                <Button className='chakra_btn' onClick={() => props.handleDelete(id)} colorScheme='red'>Delete</Button>
            </div>
        </ChakraProvider>


    )
}

export default Issueinfo;
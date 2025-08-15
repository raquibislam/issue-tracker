import { Box, Button, ButtonGroup, ChakraProvider, Flex, FormControl, FormLabel, Heading, Input, Menu, MenuButton, MenuGroup, MenuItem, MenuList, Select, Spacer } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import '../../App.css';
import { json } from 'react-router-dom';
import Issueinfo from '../IssueInfo/Issueinfo';



const Home = (props) => {


    const [issueArr, setissueArr] = useState([]);

    const { name, email, sign } = props.user;

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('issueStore'));
        if (items) {
            setissueArr(items);
        }
    }, []);

    const addIssue = () => {
        const id = Math.floor(Math.random() * 1000000);
        const desc = document.getElementById('desc').value;
        const assign = document.getElementById('assigned').value;
        const option = document.getElementById('option').value;

        const newIssue = { id, status: 'Open', desc, assign, option };

        const newArr = [...issueArr, newIssue];
        setissueArr(newArr);



        localStorage.setItem('issueStore', JSON.stringify(newArr));
        document.getElementById("issueInputForm").reset();


    }



    const handleClose = (finId) => {
        const findArr = issueArr.find(({ id }) => id === finId);
        findArr.status = 'Close';
        const issueFilter = issueArr.filter(({ id }) => id !== finId);
        const newArr = [...issueFilter, findArr];
        setissueArr(newArr);

        localStorage.setItem('issueStore', JSON.stringify(newArr));
    }

    const handleDelete = (deleteId) => {
        const issueDeleteFilter = issueArr.filter(({ id }) => id !== deleteId);
        setissueArr(issueDeleteFilter);

        localStorage.setItem('issueStore', JSON.stringify(issueDeleteFilter));
    }

    const addBtn = () => {
        addIssue();
    }



    let cnt = 0;
    for (let i = 0; i < issueArr.length; i++) {
        if (issueArr[i].status === 'Close') cnt++;

    }

    return (
        <ChakraProvider>
            <div className='home_container'>

                <Flex minWidth='max-content' alignItems='center' gap='2'>
                    <Box p='2'>
                        <h1>Issue Tracker: <span>{cnt}</span>/{issueArr.length}</h1><span class="glyphicon glyphicon-time"></span>
                    </Box>
                    <Spacer />
                    {/* <ButtonGroup gap='2'>
                        <Menu>
                            <MenuButton className='btn' as={Button} colorScheme='gray'>

                            </MenuButton>
                            <MenuList>
                                <MenuGroup title=''>
                                    <MenuItem>{name}</MenuItem>
                                    <MenuItem>{email} </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                        <Button className='btn' onClick={props.handleOut} colorScheme='pink'>{sign}</Button>
                    </ButtonGroup> */}
                </Flex>


                <form className='chakra_form' id='issueInputForm'>
                    <h3>Add New Issue:</h3>
                    <FormControl className='from_ctrl'>
                        <FormLabel className='label'>Description</FormLabel>
                        <Input id='desc' className='input_field' placeholder='Describe the issue ...' />
                    </FormControl>
                    <FormControl className='from_ctrl'>
                        <FormLabel className='label'>Severity</FormLabel>
                        <Select id='option' className='input_field'>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>Heigh</option>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel className='label'>Assigned To</FormLabel>
                        <Input id='assigned' className='input_field' placeholder='Enter responsible ...' />
                    </FormControl>
                    <Button onClick={addBtn} className='btn' colorScheme='blue'>Add</Button>
                </form>

                <div>
                    <Issueinfo handleClose={handleClose} handleDelete={handleDelete} issue={issueArr}></Issueinfo>
                </div>

            </div>
        </ChakraProvider>
    );
};

export default Home;
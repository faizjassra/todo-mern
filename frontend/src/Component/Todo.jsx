import { IoClose } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { Box, Checkbox, IconButton } from '@mui/material';
import { useState } from 'react'


export default function Todo({ value, handleDelete, handleUpdate }) {
    const [checked, setChecked] = useState(value.status)

    const handleStatus = async () => {
        setChecked(!checked)
        await fetch(`/todos/${value._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: !checked })
        })
    }




    return (

        <Box display='flex'justifyContent='space-between'>
            <Box display='flex' alignItems='center'>
                <Checkbox checked={checked} onChange={handleStatus} sx={{
                    color: '#d32f2f',
                    '&.Mui-checked': {
                        color: '#d32f2f',
                    },

                }} />
                <div className={`${checked ? 'line' : ''} Container`}>{value.todo}</div>
            </Box>
            <Box>
                <IconButton size="large"   >
                    <FaEdit size={20} onClick={() => handleUpdate(value)} />
                </IconButton>

                <IconButton size="large"  >
                    <IoClose size={20} onClick={() => handleDelete(value._id)} />
                </IconButton>
            </Box>
        </Box>
    )
}
import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { UserContext } from "../../context/UserContext.jsx";

function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  // Formata a data no formato DD/MM/AAAA
  const formattedDate = `${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;

  // Formata a hora no formato HH:MM:SS
  const formattedTime = `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;

  return { data: formattedDate, time: formattedTime };
}

export function AdminPage() {
  
const { admData } = useContext(UserContext);
console.log(admData, typeof admData);

const rows = admData.dataAdm

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" component="h1" style={{ margin: 50 }}>Resultados da Página de Phishing</Typography>
      <TableContainer style={{ width: '50%' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Senha</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.password}</TableCell>
                <TableCell align="right">{formatDateTime(row.createdAt).data}</TableCell>
                <TableCell align="right">{formatDateTime(row.createdAt).time}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useNewRegistrations } from '../firebase/useNewRegistrations';

export default function NewRegistrations() {
  const { rows, loading, error } = useNewRegistrations();

  if (loading) {
    return (
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Checking for new registrations...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2, color: 'error.main' }}>
        <Typography variant="h6">Error loading data: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="h2" sx={{ p: 2, textAlign: 'center' }}>
        New Member Registrations Today
      </Typography>
      
      {rows.length === 0 ? (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body1">No new users registered today.</Typography>
        </Box>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="new registrations table">
          <TableHead>
            <TableRow>
              <TableCell>New User Name</TableCell>
              <TableCell align="right">Member ID</TableCell>
              <TableCell align="right">Registration Time</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.memberId} 
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell align="right">{row.memberId}</TableCell>
                <TableCell align="right">{row.registrationDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
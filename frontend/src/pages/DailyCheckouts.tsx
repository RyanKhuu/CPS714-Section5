import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { LineChart } from '@mui/x-charts/LineChart';
import { useDailyCheckouts } from '../firebase/useDailyCheckouts';


export default function DailyCheckouts() {
  const { data, loading, error } = useDailyCheckouts();

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading chart data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'error.main' }}>
        <Typography variant="h6">Error loading data: {error.message}</Typography>
      </Box>
    );
  }

  if (data.checkedOut.length === 0) {
    return (
      <Box sx={{ width: '100%', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">No checkout data available.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 500 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
        Daily Item Checkouts
      </Typography>
      <LineChart
        series={[
          { data: data.checkedOut, label: "Amount Checked Out" },
        ]}
        xAxis={[
          { 
            scaleType: 'point', 
            data: data.xLabels 
          }
        ]}
        yAxis={[{ width: 40 }]}
        margin={{ right: 30 }}
      />
    </Box>
  );
}
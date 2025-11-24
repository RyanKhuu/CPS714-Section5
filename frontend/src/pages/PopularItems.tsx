import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { BarChart } from '@mui/x-charts/BarChart';
import { usePopularBooks } from '../firebase/usePopularBooks'; 


export default function PopularItems() {
  const { data, loading, error } = usePopularBooks();

  if (loading) {
    return (
      <Box sx={{ width: '100%', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading popular items...</Typography>
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

  if (data.weeklyCounts.length === 0) {
    return (
      <Box sx={{ width: '100%', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">No popular book data available this week.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: 500, p: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
        Most Popular Books This Week
      </Typography>
      <BarChart
        xAxis={[{ scaleType: 'band', data: data.bookNames }]} 
        series={[
          { data: data.weeklyCounts, label: "Weekly Checkouts" }
        ]}
        height={500}
        layout="vertical"
        margin={{ top: 30, right: 30, left: 70, bottom: 80 }}
      />
    </Box>
  );
}
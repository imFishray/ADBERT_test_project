import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRates } from './btcSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';


const CURRENCY_1 = 'TWD';
const CURRENCY_2 = 'JPY';

export default function BtcChart() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state.btc);

  useEffect(() => {
    dispatch(getRates());
  }, [dispatch]);

  const chartData = React.useMemo(() => {
    if (!data.rates) return [];
    return [
      {
        label: 'USD',
        [CURRENCY_1]: data.rates[CURRENCY_1],
        [CURRENCY_2]: data.rates[CURRENCY_2],
      },
    ];
  }, [data]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={CURRENCY_1} fill="#8884d8" name={`USD/${CURRENCY_1}`} />
        <Bar dataKey={CURRENCY_2} fill="#ff7300" name={`USD/${CURRENCY_2}`} />
      </BarChart>
    </ResponsiveContainer>
  );
}

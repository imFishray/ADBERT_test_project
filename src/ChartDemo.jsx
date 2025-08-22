import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

// 改用 jsonplaceholder API，統計每個 user 的貼文數
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function ChartDemo() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(json => {
        // 統計每個 userId 的貼文數與標題字數總和
        const stats = {};
        json.forEach(post => {
          if (!stats[post.userId]) {
            stats[post.userId] = { userId: String(post.userId), count: 0, titleLength: 0 };
          }
          stats[post.userId].count += 1;
          stats[post.userId].titleLength += post.title ? post.title.length : 0;
        });
        const arr = Object.values(stats);
        setData(arr);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="userId" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" stackId="a" fill="#8884d8" name="貼文數" />
        <Bar dataKey="titleLength" stackId="a" fill="#ff7300" name="標題字數總和" />
      </BarChart>
    </ResponsiveContainer>
  );
}

import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from './postsSlice';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export default function ChartDemo() {
  const dispatch = useDispatch();
  const { data: posts, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const chartData = useMemo(() => {
    const stats = {};
    posts.forEach(post => {
      if (!stats[post.userId]) {
        stats[post.userId] = { userId: String(post.userId), count: 0, titleLength: 0 };
      }
      stats[post.userId].count += 1;
      stats[post.userId].titleLength += post.title ? post.title.length : 0;
    });
    return Object.values(stats);
  }, [posts]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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

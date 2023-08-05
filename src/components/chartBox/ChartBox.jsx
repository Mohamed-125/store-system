import { XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, LineChart, Legend, Line } from 'recharts';

const data = [
  {
    name: '25/7/2023',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '26/7/2023',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '27/7/2023',
    uv: 2000,
    pv: 13000,
    amt: 2290,
  },
  {
    name: '28/7/2023',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '29/7/2023',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '30/7/2023',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: '31/7/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '1/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '2/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '3/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '4/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '5/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '6/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '7/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '9/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '10/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: '11/8/2023',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];


const ChartBox = () => {
  return (
    <>
{/* 
      <AreaChart width={1000} height={400} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
      </AreaChart> */}
      
      <LineChart width={800} height={400} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </>
  )
}

export default ChartBox
// import ReactECharts from 'echarts-for-react';

// export function PieChart() {
//   const option = {
//     title: {
//       text: 'Subscription Status',
//       left: 'center',
//     },
//     tooltip: {
//       trigger: 'item',
//     },
//     series: [
//       {
//         name: 'Subscriptions',
//         type: 'pie',
//         radius: '50%',
//         data: [
//           { value: 10, name: 'Active' },
//           { value: 5, name: 'Paused' },
//           { value: 3, name: 'Cancelled' },
//         ],
//       },
//     ],
//   };

//   return <ReactECharts option={option} style={{ height: 400 }} />;
// }

import ReactECharts from 'echarts-for-react';

type Props = {
  active: number;
  paused: number;
  cancelled: number;
};

export function PieChart({ active, paused, cancelled }: Props) {
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: 0,
    },
    series: [
      {
        name: 'Subscriptions',
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: active, name: 'Active' },
          { value: paused, name: 'Paused' },
          { value: cancelled, name: 'Cancelled' },
        ],
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2,
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 300 }} />;
}
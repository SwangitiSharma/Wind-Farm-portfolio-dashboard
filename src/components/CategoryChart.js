import React, { useRef,useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CategoryChart =({ chartData }) => {
  const [activeTab, setActiveTab] = useState('top10Duration');
  const [sortDirection, setSortDirection] = useState('desc'); // 'asc' or 'desc'

  const [barChartOptions1, setBarChartOptions1] = useState({});
  const [barChartOptions2, setBarChartOptions2] = useState({});
  const [pieChartOptions1, setPieChartOptions1] = useState({});
  const [pieChartOptions2, setPieChartOptions2] = useState({});

  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartRef4 = useRef(null);

  useEffect(() => {
    if (chartData.length > 0) {
      // Top 10 Alarms Codes by Duration
      let top10DurationData = chartData
        .slice(0, 10)
        .map(item => ({ name: `${item.code}`, y: item.duration_seconds }));

      if (sortDirection === 'asc') {
        top10DurationData = top10DurationData.sort((a, b) => a.y - b.y);
      } else {
        top10DurationData = top10DurationData.sort((a, b) => b.y - a.y);
      }

      setBarChartOptions1({
        chart: { type: 'bar' },
        title: { text: 'Top 10 Alarms Codes by Duration' },
        xAxis: { categories: top10DurationData.map(item => item.name) },
        yAxis: { title: { text: 'Duration (seconds)' } },
        series: [{ name: 'Duration', data: top10DurationData.map(item => item.y) }],
      });

      // Top 10 Alarms Codes by Frequency
      const frequencyData = chartData.reduce((acc, item) => {
        const code = `${item.code}`;
        acc[code] = acc[code] ? acc[code] + 1 : 1;
        return acc;
      }, {});

      let sortedByFrequency = Object.keys(frequencyData)
        .map(code => ({ name: code, y: frequencyData[code] }))
        .sort((a, b) => b.y - a.y)
        .slice(0, 10);

      if (sortDirection === 'asc') {
        sortedByFrequency = sortedByFrequency.sort((a, b) => a.y - b.y);
      }

      setBarChartOptions2({
        chart: { type: 'bar' },
        title: { text: 'Top 10 Alarms Codes by Frequency' },
        xAxis: { categories: sortedByFrequency.map(item => item.name) },
        yAxis: { title: { text: 'Frequency' } },
        series: [{ name: 'Frequency', data: sortedByFrequency.map(item => item.y) }],
      });

      // Alarms by Category (Duration)
      const categoriesDurationData = chartData.reduce((acc, item) => {
        const category = item.category || 'Unknown';
        acc[category] = acc[category] ? acc[category] + item.duration_seconds : item.duration_seconds;
        return acc;
      }, {});

      let categoriesDurationArray = Object.keys(categoriesDurationData).map(category => ({
        name: category,
        y: categoriesDurationData[category],
      })).sort((a, b) => b.y - a.y);

      if (sortDirection === 'asc') {
        categoriesDurationArray = categoriesDurationArray.sort((a, b) => a.y - b.y);
      }

      setPieChartOptions1({
        chart: { type: 'pie' },
        title: { text: 'Alarms by Category (Duration)' },
        series: [{ name: 'Duration', data: categoriesDurationArray }],
      });

      // Alarms by Category (Frequency)
      const categoryMap = chartData.reduce((acc, alarm) => {
        if (!acc[alarm.category]) {
          acc[alarm.category] = { category: alarm.category, frequency: 0 };
        }
        acc[alarm.category].frequency += 1;
        return acc;
      }, {});

      let categoriesData = Object.keys(categoryMap).map(category => ({
        name: categoryMap[category].category,
        y: categoryMap[category].frequency,
      }));

      if (sortDirection === 'asc') {
        categoriesData = categoriesData.sort((a, b) => a.y - b.y);
      }

      setPieChartOptions2({
        chart: { type: 'pie' },
        title: { text: 'Alarms by Category (Frequency)' },
        series: [{ name: 'Frequency', data: categoriesData }],
      });
    }
  }, [chartData, sortDirection]);

  const handleTabChange = tab => {
    setActiveTab(tab);
  };

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="category-chart">
      <div className="tabs">
        <button onClick={() => handleTabChange('top10Duration')}>Top 10 Alarms Codes (Duration)</button>
        <button onClick={() => handleTabChange('top10Frequency')}>Top 10 Alarms Codes (Frequency)</button>
        <button onClick={() => handleTabChange('categoryDuration')}>Alarms by Category (Duration)</button>
        <button onClick={() => handleTabChange('categoryFrequency')}>Alarms by Category (Frequency)</button>
      </div>
      <div className="sort-button" onClick={toggleSortDirection}>
        Sort {sortDirection === 'asc' ? '↑' : '↓'}
      </div>
      <div className="chart-container">
        {activeTab === 'top10Duration' && (
          <HighchartsReact highcharts={Highcharts} options={{ ...barChartOptions1 }} ref={chartRef1} />
        )}
        {activeTab === 'top10Frequency' && (
          <HighchartsReact highcharts={Highcharts} options={{ ...barChartOptions2 }} ref={chartRef2} />
        )}
        {activeTab === 'categoryDuration' && (
          <HighchartsReact highcharts={Highcharts} options={{ ...pieChartOptions1 }} ref={chartRef3} />
        )}
        {activeTab === 'categoryFrequency' && (
          <HighchartsReact highcharts={Highcharts} options={{ ...pieChartOptions2 }} ref={chartRef4} />
        )}
      </div>
    </div>
  );
};

export default CategoryChart;
import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

class SimpleLineChart extends React.Component {

    constructor(props) {
        super(props);
    }

    static Names = {
        0: "Average Requests (%)",
        1: "Average Accuracy (%)",
        2: "Average Prediction Accuracy (%)",
        3: "Average Loss",
        4: "Average Reward",
    };

    static Domains= {
        0: [0, 100],
        1: [0, 100],
        2: [0, 100],
        3: [0, 30],
        4: [0, 30],
    };

    parseData(data) {
        return data.map((d, i) => {
            return {
                name: i*10,
                data: d
            };
        });
    }

    render() {
        const {data, domain} = this.props;
        return (
            // 99% per https://github.com/recharts/recharts/issues/172
            <ResponsiveContainer width="99%" height={320} minWidth={800}>
                <LineChart data={data && this.parseData(data)}>
                    <XAxis dataKey="name" name={"Hello"} />
                    <YAxis domain={domain} />
                    <CartesianGrid vertical={false} strokeDasharray="1 1" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={"data"} stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        );
    }

}

export default SimpleLineChart;
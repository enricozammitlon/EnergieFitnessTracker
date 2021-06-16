import React from 'react';
import { Charts, ChartContainer, ChartRow, YAxis, LineChart,styler,BarChart,Resizable } from "react-timeseries-charts";
import { TimeSeries, Index } from "pondjs";

export default function Chart(){
    const data = [
        ["2017-01-24T00:00", 0.01],
        ["2017-01-24T01:00", 0.13],
        ["2017-01-24T02:00", 0.07],
        ["2017-01-24T03:00", 0.04],
        ["2017-01-24T04:00", 0.33],
        ["2017-01-24T05:00", 0.2],
        ["2017-01-24T06:00", 0.08],
        ["2017-01-24T07:00", 0.54],
        ["2017-01-24T08:00", 0.95],
        ["2017-01-24T09:00", 1.12],
        ["2017-01-24T10:00", 0.66],
        ["2017-01-24T11:00", 0.06],
        ["2017-01-24T12:00", 0.3],
        ["2017-01-24T13:00", 0.05],
        ["2017-01-24T14:00", 0.5],
        ["2017-01-24T15:00", 0.24],
        ["2017-01-24T16:00", 0.02],
        ["2017-01-24T17:00", 0.98],
        ["2017-01-24T18:00", 0.46],
        ["2017-01-24T19:00", 0.8],
        ["2017-01-24T20:00", 0.39],
        ["2017-01-24T21:00", 0.4],
        ["2017-01-24T22:00", 0.39],
        ["2017-01-24T23:00", 0.28]
    ];
    const series = new TimeSeries({
      name: "hilo_rainfall",
      columns: ["index", "precip"],
      points: data.map(([d, value]) => [Index.getIndexString("1h", new Date(d)), value])
    });
    const axis_style = { label: { stroke: "none", fill: "#C0C0C0",'font-weight': 'bold', 'font-size': 'large',  font: '"Goudy Bookletter 1911", sans-serif"' },
     values: { stroke: "none", fill: "#C0C0C0",'font-weight': 'normal', 'font-size': 'medium', font: '"Goudy Bookletter 1911", sans-serif"' },
      ticks: { fill: "none", stroke: "#C0C0C0" },
       axis: { fill: "none", stroke: "none" } }
    const style = styler([{ key: "precip", color: "#76B82A", selected: "#2CB1CF" }]);
    return (
        <div style={{width:'80%'}}>
        <Resizable>
            <ChartContainer timeRange={series.range()} timeAxisStyle={axis_style} title="Gym Visitors" timeAxisTickCount={8}
            style={{
                background: "#201d1e",
                borderRadius: 8,
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: "white"
            }} titleStyle={{
                color: "white",
                fontWeight: 500,
                fontSize:25,
                paddingBottom:10
                
            }}>
        
                <ChartRow height="250">
                    <YAxis
                        id="rain"
                        style={axis_style}
                        label="Visitors"
                        format="0d"
                        tickCount={2}
                        width={100}
                        labelOffset={-15}
                        type="linear"
                    />
                    <Charts>
                        <BarChart
                            axis="rain"
                            style={style}
                            columns={["precip"]}
                            series={series}
                        />
                    </Charts>
                </ChartRow>
            </ChartContainer>
            </Resizable>
            </div>
    )
}